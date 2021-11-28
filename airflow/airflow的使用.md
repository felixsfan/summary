# 取消airflow自带example

Airflow附带了许多示例DAG。 请注意，在你自己的`dags_folder`中至少有一个DAG定义文件之前，这些示例可能无法正常工作。你可以通过更改`airflow.cfg`中的`load_examples`设置来隐藏示例DAG。

```shell
vim airflow.cfg
load_examples=False
```

# 编写AirFlow DAG

airflow的使用百分之九十都在编写DAGs文件夹里的DAG，这些就我们的任务集合

```python
"""
Airflow 教程代码位于:
https://github.com/apache/airflow/blob/master/airflow/example_dags/tutorial.py
"""
from airflow import DAG
from airflow.operators.bash_operator import BashOperator
from datetime import datetime, timedelta

default_args = {
    'owner': 'airflow',
    'depends_on_past': False,            # 单个任务实例的执行将取决于前面任务实例是否成功
    'start_date': datetime(2015, 6, 1),  # 第一个任务开始的时间
    'email': ['airflow@example.com'],
    'email_on_failure': False,
    'email_on_retry': False,
    'retries': 1,                        # 重试次数 
    'retry_delay': timedelta(minutes=5), # 失败后多久后重试
    # 'queue': 'bash_queue',
    # 'pool': 'backfill',
    # 'priority_weight': 10,
    # 'end_date': datetime(2016, 1, 1),
}

# schedule_interval:多久调度一次
dag = DAG('tutorial', default_args=default_args, schedule_interval=timedelta(days=1))

# t1、t2 是通过实例化 Operators 创建的任务示例
t1 = BashOperator(
    task_id='print_date',
    bash_command='date',
    dag=dag)

t2 = BashOperator(
    task_id='sleep',
    bash_command='sleep 5',
    retries=3,
    dag=dag)

t2.set_upstream(t1)
```

## DAG 定义文件

这个 Airflow 的 Python 脚本实际上只是一个将 DAG 的结构指定为代码的配置文件。此处定义的实际任务将在与此脚本定义的不同上下文中运行。

人们有时会将 DAG 定义文件视为可以进行实际数据处理的地方 - 但事实并非如此！该脚本的目的是定义 DAG 对象。它需要快速评估（秒，而不是几分钟），因为 scheduler（调度器）将定期执行它以反映更改（如果有的话）。

## 导入模块

一个 Airflow 的 pipeline 就是一个 Python 脚本，这个脚本的作用是为了定义 Airflow 的 DAG 对象。首先导入我们需要的库

```python
# DAG 对象; 我们将需要它来实例化一个 DAG
from airflow import DAG

# Operators; 我们需要利用这个对象去执行流程!
from airflow.operators.bash_operator import BashOperator
```

## 默认参数

我们即将创建一个 DAG 和一些任务，我们可以选择显式地将一组参数传递给每个任务的构造函数（这可能变得多余），或者（最好地）我们可以定义一个默认参数的字典，这样我们可以在创建任务时使用它。

```python
from datetime import datetime, timedelta

default_args = {
    'owner': 'airflow',
    'depends_on_past': False,
    'start_date': datetime(2015, 6, 1),
    'email': ['airflow@example.com'],
    'email_on_failure': False,
    'email_on_retry': False,
    'retries': 1,
    'retry_delay': timedelta(minutes=5),
    # 'queue': 'bash_queue',
    # 'pool': 'backfill',
    # 'priority_weight': 10,
    # 'end_date': datetime(2016, 1, 1),
}

```

## 实例化一个 DAG

我们需要一个 DAG 对象来嵌入我们的任务。这里我们传递一个定义为`dag_id`的字符串，把它用作 DAG 的唯一标识符。我们还传递我们刚刚定义的默认参数字典，同时也为 DAG 定义`schedule_interval`，设置调度间隔为每天一次。

```python
dag = DAG(
    'tutorial', default_args=default_args, schedule_interval=timedelta(days=1))
```

## （Task）任务

在实例化 operator（执行器）时会生成任务。从一个 operator（执行器）实例化出来的对象的过程，被称为一个构造方法。第一个参数`task_id`充当任务的唯一标识符。

```python
t1 = BashOperator(
    task_id='print_date',
    bash_command='date',
    dag=dag)

t2 = BashOperator(
    task_id='sleep',
    bash_command='sleep 5',
    retries=3,
    dag=dag)
```

注意到我们传递了一个 BaseOperator 特有的参数(`bash_command`)和所有的 operator 构造函数中都会有的一个参数(`retries`)。这比为每个构造函数传递所有的参数要简单很多。另请注意，在第二个任务中，我们使用`3`覆盖了默认的`retries`参数值。

任务参数的优先规则如下：

1. 明确传递参数
2. `default_args`字典中存在的值
3. operator 的默认值（如果存在）

任务必须包含或继承参数`task_id`和`owner`，否则 Airflow 将出现异常。

## 设置依赖关系

我们有三个不相互依赖任务，分别是`t1`，`t2`，`t3`。以下是一些可以定义它们之间依赖关系的方法：

```python
t1.set_downstream(t2)

# 这意味着 t2 会在 t1 成功执行之后才会执行
# 与下面这种写法相等
t2.set_upstream(t1)

# 位移运算符也可用于链式运算
# 用于链式关系 和上面达到一样的效果
t1 >> t2

# 位移运算符用于上游关系中
t2 << t1


# 使用位移运算符能够链接
# 多个依赖关系变得简洁
t1 >> t2 >> t3

# 任务列表也可以设置为依赖项。
# 下面的这些操作都具有相同的效果:
t1.set_downstream([t2, t3])
t1 >> [t2, t3]
[t2, t3] << t1

```

请注意，在执行脚本时，在 DAG 中如果存在循环或多次引用依赖项时，Airflow 会引发异常。

## 测试

### 运行脚本

是时候进行一些测试了。首先让我们确保 pipeline（管道）能够被解析。让我们保证已经将前面的几个步骤的代码保存在`tutorial.py`文件中，并将文件放置在`airflow.cfg`设置的 DAGs 文件夹中。DAGs 的默认位置是`~/airflow/dags`。

```shell
python ~/airflow/dags/tutorial.py
```

如果这个脚本没有报错，那就证明代码和 Airflow 环境没有特别大的问题。

### 命令行元数据验证

让我们运行一些命令来进一步验证这个脚本。

```bash
# 打印出所有正在活跃状态的 DAGs
airflow list_dags

# 打印出 'tutorial' DAG 中所有的任务
airflow list_tasks tutorial

# 打印出 'tutorial' DAG 的任务层次结构
airflow list_tasks tutorial --tree
```

### 测试实例

让我们通过在特定日期运行实际任务实例来进行测试。通过`execution_date`这个上下文指定日期，它会模拟 scheduler 在特定的 日期 + 时间 运行您的任务或者 dag：

```bash
# 命令样式: command subcommand dag_id task_id date

# 测试 print_date
airflow test tutorial print_date 2015-06-01

# 测试 sleep
airflow test tutorial sleep 2015-06-01
```

`airflow test`命令在本地运行任务实例时，会将其日志输出到 stdout（在屏幕上），不会受依赖项影响，并且不向数据库传达状态（运行，成功，失败，...）。它只允许测试单个任务实例。

### Backfill（回填）

`backfill`将尊重您的依赖关系，将日志发送到文件并与数据库通信以记录状态。如果您启动了一个 web 服务，您可以跟踪它的进度。`airflow webserver`将启动 Web 服务器，如果您有兴趣在 backfill（回填）过程中直观地跟踪进度。

请注意，如果使用`depends_on_past=True`，则单个任务实例的执行将取决于前面任务实例是否成功，除了以 start_date 作为开始时间的实例（即第一个运行的 DAG 实例），他的依赖性会被忽略。

此上下文中的日期范围是`start_date`和可选的`end_date`，它们用于使用此 dag 中的任务实例填充运行计划。

```bash
# 可选，在后台以 debug 模式运行 web 服务器
# airflow webserver --debug &

# 在时间范围内回填执行任务
airflow backfill tutorial -s 2015-06-01 -e 2015-06-07
```

# 调度和触发器

## 调度时间

Airflow 调度程序监视所有任务和所有 DAG，并触发已满足其依赖关系的任务实例。 在幕后，它监视并与其可能包含的所有 DAG 对象的文件夹保持同步，并定期（每分钟左右）检查活动任务以查看是否可以触发它们。

Airflow 调度程序旨在作为 Airflow 生产环境中的持久服务运行。 要开始，您需要做的就是执行`airflow scheduler` 。 它将使用`airflow.cfg`指定的配置。

请注意，如果您在一天的`schedule_interval`上运行 DAG，则会在`2016-01-01T23:59`之后不久触发标记为`2016-01-01`的运行。 换句话说，作业实例在其覆盖的时间段结束后启动。 请注意，如果您运行一个`schedule_interval`为 1 天的的`DAG`，`run`标记为`2016-01-01`，那么它会在`2016-01-01T23:59`之后马上触发。换句话说，一旦设定的时间周期结束后，工作实例将立马开始。

**让我们重复一遍**调度`schedule_interval`在开始日期之后，在句点结束时运行您的作业一个`schedule_interval` 。

## DAG 运行

DAG Run 是一个表示 DAG 实例化的对象。

每个 DAG 可能有也可能没有时间表，通知如何创建`DAG Runs` 。 `schedule_interval`被定义为 DAG 参数，并且优选地接收作为`str`的[cron 表达式](https://en.wikipedia.org/wiki/Cron)或`datetime.timedelta`对象。 或者，您也可以使用其中一个 cron“预设”：

| 预置       | 含义                               | cron 的     |
| ---------- | ---------------------------------- | ----------- |
| `None`     | 不要安排，专门用于“外部触发”的 DAG |             |
| `@once`    | 安排一次，只安排一次               |             |
| `@hourly`  | 在小时开始时每小时运行一次         | `0 * * * *` |
| `@daily`   | 午夜一天运行一次                   | `0 0 * * *` |
| `@weekly`  | 周日早上每周午夜运行一次           | `0 0 * * 0` |
| `@monthly` | 每个月的第一天午夜运行一次         | `0 0 1 * *` |
| `@yearly`  | 每年 1 月 1 日午夜运行一次         | `0 0 1 1 *` |

您的 DAG 将针对每个计划进行实例化，同时为每个计划创建`DAG Run`条目。

DAG 运行具有与它们相关联的状态（运行，失败，成功），并通知调度程序应该针对任务提交评估哪组调度。 如果没有 DAG 运行级别的元数据，Airflow 调度程序将需要做更多的工作才能确定应该触发哪些任务并进行爬行。 在更改 DAG 的形状时，也可能会添加新任务，从而创建不需要的处理。

## 回填和追赶

## depends_on_past