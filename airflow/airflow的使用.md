# 1. 取消airflow自带example

Airflow附带了许多示例DAG。 请注意，在你自己的`dags_folder`中至少有一个DAG定义文件之前，这些示例可能无法正常工作。你可以通过更改`airflow.cfg`中的`load_examples`设置来隐藏示例DAG。

```shell
vim airflow.cfg
load_examples=False
```

# 2.编写AirFlow DAG

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

## 2.1 DAG 定义文件

这个 Airflow 的 Python 脚本实际上只是一个将 DAG 的结构指定为代码的配置文件。此处定义的实际任务将在与此脚本定义的不同上下文中运行。

人们有时会将 DAG 定义文件视为可以进行实际数据处理的地方 - 但事实并非如此！该脚本的目的是定义 DAG 对象。它需要快速评估（秒，而不是几分钟），因为 scheduler（调度器）将定期执行它以反映更改（如果有的话）。

## 2.2 导入模块

一个 Airflow 的 pipeline 就是一个 Python 脚本，这个脚本的作用是为了定义 Airflow 的 DAG 对象。首先导入我们需要的库

```python
# DAG 对象; 我们将需要它来实例化一个 DAG
from airflow import DAG

# Operators; 我们需要利用这个对象去执行流程!
from airflow.operators.bash_operator import BashOperator
```

## 2.3 默认参数

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

## 2.4 实例化一个 DAG

我们需要一个 DAG 对象来嵌入我们的任务。这里我们传递一个定义为`dag_id`的字符串，把它用作 DAG 的唯一标识符。我们还传递我们刚刚定义的默认参数字典，同时也为 DAG 定义`schedule_interval`，设置调度间隔为每天一次。

```python
dag = DAG(
    'tutorial', default_args=default_args, schedule_interval=timedelta(days=1))
```

## 2.5（Task）任务

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

## 2.6 设置依赖关系

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

## 2.7 测试

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

# 3. 运算符

## 3.1 BashOperator

使用[`BashOperator`来在[Bash](https://www.gnu.org/software/bash/) shell 中执行命令。

气流/example_dags/example_bash_operator.py

```python
run_this = BashOperator(
    task_id='run_after_loop',
    bash_command='echo 1',
)
```

### 传入参数

您可以使用[Jinja 模板](https://airflow.apache.org/docs/apache-airflow/stable/concepts/operators.html#concepts-jinja-templating)来参数化 `bash_command`参数。

气流/example_dags/example_bash_operator.py

```python
also_run_this = BashOperator(
    task_id='also_run_this',
    bash_command='echo "run_id={{ run_id }} | dag_run={{ dag_run }} ｜ {{ execution_date }}"',
)
```

### 访问有关任务的所有信息，并作为参数

直接jinja模版访问即可

## 3.2 PythonOperator

使用`PythonOperator`来执行 Python 可调用文件。

气流/example_dags/example_python_operator.py

```python
def print_context(ds, **kwargs):
    """Print the Airflow context and ds variable from the context."""
    pprint(kwargs)
    print(ds)
    return 'Whatever you return gets printed in the logs'

run_this = PythonOperator(
    task_id='print_the_context',
    python_callable=print_context,
)
```

### 传入参数

使用`op_args`和`op_kwargs`参数将附加参数传递给 Python 可调用对象。

气流/example_dags/example_python_operator.py

```python
def my_sleeping_function(random_base):
    """This is a function that will run within the DAG execution"""
    time.sleep(random_base)

# Generate 5 sleeping tasks, sleeping from 0.0 to 0.4 seconds respectively
for i in range(5):
    task = PythonOperator(
        task_id='sleep_for_' + str(i),
        python_callable=my_sleeping_function,
        op_kwargs={'random_base': float(i) / 10},
    )
    run_this >> task
```

### 访问有关任务的所有信息，并作为参数

在 python operator 下，用如下代码

```python
def example(**context):
	execution_date = context['execution_date'] // 这里获取 execution_date 变量
	thedate = execution_date - timedelta(days=1) # 获得前一天的时间

task_example = PythonOperator(
    task_id='clean_adv_user_hs_to_ch',
    provide_context=True, // 这里要设置为 True
    python_callable=example,
    dag=dag,
)
```

使用`PythonOperator`的情况下

现在只需添加选项

```python
provide_context=True,
```

并使用指针扩展您的可调用对象，例如

```python
def example(**context):
```

现在，在函数中，就可以访问有关任务的所有信息，包括执行日期，如下所示：

```python
task_instance = context['task_instance']
execution_date = context['execution_date']
```

# 4. Jinja模版

## 使用

气流利用了Jinja模板的强大功能，这是一个与宏结合使用的强大工具。

例如，假设您希望使用Bash操作符将数据间隔的开始作为环境变量传递给Bash脚本：

```python
# The start of the data interval as YYYY-MM-DD
date = "{{ ds }}"
t = BashOperator(
    task_id="test_env",
    bash_command="/tmp/test.sh ",
    dag=dag,
    env={"DATA_INTERVAL_START": date},
)
```

在这里，{ds}是一个模板化变量，因为Bash操作符的env参数是用Jinja模板化的，所以数据间隔的开始日期将作为名为data_interval_start的环境变量在Bash脚本中可用。

您可以对文档中标记为“模板化”的每个参数使用Jinja模板化。模板替换发生在调用运算符的pre_execute函数之前。

您也可以对嵌套字段使用Jinja模板，只要这些嵌套字段在其所属的结构中标记为模板：在template_fields属性中注册的字段将提交给模板替换，如下面示例中的路径字段：

```python
class MyDataReader:
    template_fields = ["path"]

    def __init__(self, my_path):
        self.path = my_path

    # [additional code here...]


t = PythonOperator(
    task_id="transform_data",
    python_callable=transform_data,
    op_args=[MyDataReader("/tmp/{{ ds }}/my_file")],
    dag=dag,
)
```

template_fields属性同样可以是类变量或实例变量。

也可以替换深嵌套字段，只要所有中间字段都标记为模板字段：

```python
class MyDataTransformer:
    template_fields = ["reader"]

    def __init__(self, my_reader):
        self.reader = my_reader

    # [additional code here...]


class MyDataReader:
    template_fields = ["path"]

    def __init__(self, my_path):
        self.path = my_path

    # [additional code here...]


t = PythonOperator(
    task_id="transform_data",
    python_callable=transform_data,
    op_args=[MyDataTransformer(MyDataReader("/tmp/{{ ds }}/my_file"))],
    dag=dag,
)
```

创建DAG时，可以将自定义选项传递给Jinja环境。一种常见用法是避免Jinja从模板字符串中删除尾随换行符：

```python
my_dag = DAG(
    dag_id="my-dag",
    jinja_environment_kwargs={
        "keep_trailing_newline": True,
        # some other jinja2 Environment options here
    },
)
```

## 模板参考

可以在模板中使用变量、宏和过滤器（请参阅Jinja模板部分）

以下内容随 Airflow 开箱即用。其他自定义宏可以通过插件全局添加，也可以通过DAG.user_defined_macros参数在DAG级别添加。

### 变量

默认情况下，气流引擎会传递一些在所有模板中都可以访问的变量

| 多变的                                   | 描述                                                         |
| ---------------------------------------- | ------------------------------------------------------------ |
| `{{ data_interval_start }}`              | 数据间隔的开始 ( [pendulum.DateTime] )。                     |
| `{{ data_interval_end }}`                | 数据间隔结束 ( [pendulum.DateTime] )。                       |
| `{{ ds }}`                               | DAG 运行的逻辑日期为`YYYY-MM-DD`。和`{{ dag_run.logical_date | ds }}`一样 |
| `{{ ds_nodash }}`                        | 和`{{ dag_run.logical_date | ds_nodash }}`一样。             |
| `{{ ts }}`                               | 和{{ dag_run.logical_date \| ts }}一样，例子`2018-01-01T00:00:00+00:00` |
| `{{ ts_nodash_with_tz }}`                | 一样：{{ dag_run.logical_date \| ts_nodash_with_tz }}`例子： `20180101T000000+0000` |
| `{{ ts_nodash }}`                        | 一样：`{{ dag_run.logical_date | ts_nodash }}`例子 `20180101T000000` |
| `{{ prev_data_interval_start_success }}` | 从先前成功的 DAG 运行开始的数据间隔（[pendulum.DateTime](https://pendulum.eustace.io/docs/#introduction)或`None`）。 |
| `{{ prev_data_interval_end_success }}`   | 之前成功运行 DAG 的数据间隔结束（[pendulum.DateTime](https://pendulum.eustace.io/docs/#introduction)或`None`）。 |
| `{{ prev_start_date_success }}`          | 上一次成功运行 dag 的开始日期（如果可用）（[pendulum.DateTime](https://pendulum.eustace.io/docs/#introduction)或`None`）。 |
| `{{ dag }}`                              | DAG 对象。                                                   |
| `{{ task }}`                             | 任务对象。                                                   |
| `{{ macros }}`                           | 对宏包的引用，如下所述。                                     |
| `{{ task_instance }}`                    | task_instance 对象。                                         |
| `{{ ti }}`                               | 一样。`{{ task_instance }}`                                  |
| `{{ params }}`                           | 对用户定义的 params 字典的引用，如果您在`trigger_dag -c` `dag_run_conf_overrides_params``airflow.cfg` |
| `{{ var.value.my_var }}`                 | 全局定义的变量表示为字典。                                   |
| `{{ var.json.my_var.path }}`             | 全局定义的变量表示为字典。使用反序列化的 JSON 对象，将路径附加到 JSON 对象中的键。 |
| `{{ conn.my_conn_id }}`                  | 连接表示为字典。                                             |
| `{{ task_instance_key_str }}`            | 格式为 `{dag_id}__{task_id}__{ds_nodash}`.                   |
| `{{ conf }}`                             | 位于的完整配置对象 `airflow.configuration.conf`代表您的`airflow.cfg`. |
| `{{ run_id }}`                           | 在`run_id`当前DAG运行。                                      |
| `{{ dag_run }}`                          | 对 DagRun 对象的引用。                                       |
| `{{ test_mode }}`                        | 是否使用 CLI 的 test 子命令调用了任务实例。                  |

以下变量已弃用。保留它们是为了向后兼容，但您应该将现有代码转换为使用其他变量。

| 弃用的变量                          | 描述                                                         |
| ----------------------------------- | ------------------------------------------------------------ |
| `{{ execution_date }}`              | 执行日期（逻辑日期），同 `dag_run.logical_date`              |
| `{{ next_execution_date }}`         | 下一个执行日期（如果可用）（[pendulum.DateTime](https://pendulum.eustace.io/docs/#introduction)）如果是和 是， 将是`{{ execution_date }}` `2018-01-01 00:00:00` `schedule_interval` `@weekly` `{{ next_execution_date }}` `2018-01-08 00:00:00` |
| `{{ next_ds }}`                     | 下一个执行日期就`YYYY-MM-DD`好像存在一样，否则`None`         |
| `{{ next_ds_nodash }}`              | 下一个执行日期就`YYYYMMDD`好像存在一样，否则`None`           |
| `{{ prev_execution_date }}`         | 上一个执行日期（如果可用）（[pendulum.DateTime](https://pendulum.eustace.io/docs/#introduction)）如果是和 是， 将是`{{ execution_date }}` `2018-01-08 00:00:00` `schedule_interval` `@weekly` `{{ prev_execution_date }}` `2018-01-01 00:00:00` |
| `{{ prev_ds }}`                     | 上一个执行日期就`YYYY-MM-DD`好像存在一样，否则`None`         |
| `{{ prev_ds_nodash }}`              | 上一个执行日期就`YYYYMMDD`好像存在一样，否则`None`           |
| `{{ yesterday_ds }}`                | 执行日期前一天作为 `YYYY-MM-DD`                              |
| `{{ yesterday_ds_nodash }}`         | 执行日期前一天作为 `YYYYMMDD`                                |
| `{{ tomorrow_ds }}`                 | 执行日期后的第二天作为 `YYYY-MM-DD`                          |
| `{{ tomorrow_ds_nodash }}`          | 执行日期后的第二天作为 `YYYYMMDD`                            |
| `{{ prev_execution_date_success }}` | 上一次成功运行 dag 的执行日期                                |

请注意，您可以使用简单的点表示法访问对象的属性和方法。以下是一些可能的示例： , , , ... 有关对象的属性和方法的更多信息，请参阅模型文档。`{{ task.owner }}` `{{ task.task_id }}` `{{ ti.hostname }}`

该`var`模板变量可以让你在气流的UI定义的访问变量。您可以以纯文本或 JSON 的形式访问它们。如果您使用 JSON，您还可以遍历嵌套结构，例如像这样的字典： 。`{{ var.json.my_dict_var.key1 }}`

如果需要，也可以使用或 来 按字符串获取变量 。如果变量不存在，可以提供默认值。`{{ var.value.get('my.var', 'fallback') }}` `{{ var.json.get('my.dict.var', {'key1': 'val1'}) }}`

同样，可以通过`conn`模板变量访问气流连接数据。例如，您可以在模板中使用表达式，例如, 等。就像可以通过字符串获取连接（例如 ）或提供默认值（例如）`{{ conn.my_conn_id.login }}` `{{ conn.my_conn_id.password }}` `var` `{{ conn.get('my_conn_id_'+index).host }}` `{{ conn.get('my_conn_id', {"host": "host1", "login": "user1"}).host }}`

### 过滤器

气流定义了一些可用于格式化值的Jinja过滤器。

例如，使用{{execution_date}将以YYYY-MM-DD格式输出执行日期。

| 筛选                | 操作于   | 描述                                                         |
| ------------------- | -------- | ------------------------------------------------------------ |
| `ds`                | datetime | 将日期时间格式化为 `YYYY-MM-DD`                              |
| `ds_nodash`         | datetime | 将日期时间格式化为 `YYYYMMDD`                                |
| `ts`                | datetime | 同`.isoformat()`，示例：`2018-01-01T00:00:00+00:00`          |
| `ts_nodash`         | datetime | 与`ts`没有`-`,`:`或时区信息的过滤器相同。例子：`20180101T000000` |
| `ts_nodash_with_tz` | datetime | 作为`ts`没有`-`或 的过滤器`:`。例子 `20180101T000000+0000`   |

### 宏

宏是一种向模板公开对象的方法，它位于模板中的宏命名空间下。

提供了一些常用的库和方法。

| 多变的             | 描述                          |
| ------------------ | ----------------------------- |
| `macros.datetime`  | 标准库 [`datetime.datetime`]  |
| `macros.timedelta` | 标准库 [`datetime.timedelta`] |
| `macros.dateutil`  | 对`dateutil`包的引用          |
| `macros.time`      | 标准库 [`datetime.time`]      |
| `macros.uuid`      | 标准库 [`uuid`]               |
| `macros.random`    | 标准库 [`random`]             |

# 5. 调度和触发器

## 5.1 时间问题

### 5.1.1 数据间隔(schedular_interval)

在 Airflow 中运行的每个 DAG 都有一个分配的“数据间隔”，代表其运行的时间范围。例如，对于使用 调度的 DAG `@daily`，其每个数据间隔将在每天的午夜开始并在第二天的午夜结束.

**DAG 运行通常在其关联的数据间隔结束后进行调度**，以确保运行能够收集该时间段内的所有数据。换句话说，覆盖2020-01-01数据周期的运行一般会在2020-01-01结束后才开始运行，即2020-01-02 00:00:00之后。

### 5.1.1 start_date(开始时间)

最近一次执行任务实例的开始时间

程序第一次运行时需要手工设置

#### 5.1.1.1 调度时间

Airflow 调度程序监视所有任务和所有 DAG，并触发已满足其依赖关系的任务实例。 在幕后，它监视并与其可能包含的所有 DAG 对象的文件夹保持同步，并定期（每分钟左右）检查活动任务以查看是否可以触发它们。

Airflow 调度程序旨在作为 Airflow 生产环境中的持久服务运行。 要开始，您需要做的就是执行`airflow scheduler` 。 它将使用`airflow.cfg`指定的配置。

请注意，如果您在一天的`schedule_interval`上运行 DAG，则会在`2016-01-01T23:59`之后不久触发标记为`2016-01-01`的运行。 换句话说，作业实例在其覆盖的时间段结束后启动。 请注意，如果您运行一个`schedule_interval`为 1 天的的`DAG`，`run`标记为`2016-01-01`，那么它会在`2016-01-01T23:59`之后马上触发。换句话说，一旦设定的时间周期结束后，工作实例将立马开始。

**让我们重复一遍**调度`schedule_interval`在开始日期之后，在句点结束时运行您的作业一个`schedule_interval` 。

#### 5.1.1.2 问题出现

  Airflow是一个定时调度框架，最近公司需要用到airflow进行对脚本程序的调度。所以公司搭建了一个Airflow的平台，现在有一个任务需要在每天的18点02分执行,那么我们怎么做呢？
我们编辑了一个Airflow的python文档，(具体的代码就不放出来了）里面的内容大致如下:

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200618232525468.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L09sZERpcnZlckhlbHBNZQ==,size_16,color_FFFFFF,t_70)

在这个图里面，关注两个变量名称
* `start_date`
* `schedule_intervel`
现在需求是从2020-06-18 18:02:00开始程序的第一次执行，此后，程序将会在每一天的18:02:00这个时间点执行。
在实现这个需求之前，我们先做了一个针对Airflow的测试，测试的目的是想要验证一下Airflow能否正常的去执行。

#### 5.1.1.3 测试过程

在开始之前，我们准备了一个shell脚本内容如下:

```shell
date >> mydate.txt
```

在北京时间为:`2020-06-18 15:16:00`的时刻下（当前时间`2020-06-18 15:14:00`），我们想要让这个shell脚本第一次执行，并且每五分钟执行一次。
当时的参数如下:
`start_date`设置为:`datetime(2020,6,18,15,16)`
`scheduler_interval`设置为:`*/5 * * *`
  当时的想法是:程序在`start_date`即`2020年6月18日的15点16分`，进行第一次的任务调度。即：`2020-06-18 15:16:00`的时候进行第一次的任务调度。因为设置了调度周期`scheduler_interval`所以，程序会每五分钟调度一次，即在`2020-06-18 15:21:00`的时候开始进行第二次调度。之后每五分钟执行一次。

##### 注意

  上面的执行逻辑是错误的。在我们实际的测试之后发现，该程序第一次的运行时间，为`2020-06-18 15:25:00` 这与上述我期望的第一次的执行时间（`2020-06-18 15:16:00`）不同。所以问题出现了，start_date设置的时间不是程序第一次启动的时间。

#### 5.1.1.4 探究过程

查阅了官方的文档,并且经过一系列的测试。得出了结论:

1.第一次运行的时间并不能用`start_date`来理解,应该用后面的`scheduler_interval`来理解
`scheduler_interval`用的是`cron`表达式，在我的测试例子中,cron表达式为:`*/5 * * *`
表达的是每5分钟运行一次。所以，在2020年6月18日15点的时间区间里面，程序执行的时间点为:
时间表（起个临时名字）

```shell
2020-06-18 15:00:00
2020-06-18 15:05:00
2020-06-18 15:10:00
2020-06-18 15:15:00
2020-06-18 15:20:00
2020-06-18 15:25:00
2020-06-18 15:30:00
. . . 
2020-06-18 15:50:00
2020-06-18 15:55:00
```

而不是期望的`start_date`+n * `scheduler_inveral` (n ∈N)

```shell
例如 start_date = 2020-06-18 15:16:00
第二次执行时间:2020-06-18 15:21:00
第三次执行时间:2020-06-18 15:26:00
（然而事实不是这样的，哦豁，摊手，上面的时间点就没在上面的时间表里面）
```

当时我们处于`2020-06-18 15:14:00`这个时间点,设置的`start_date`为`2020-06-18 15:16:00`，可以看到离`2020-06-18 15:16:00`这个时间点最近的执行时间是2`020-06-18 15:20:00`，然而第一次执行的时间点是`2020-06-18 15:25:00`，（下面解释为啥）

2. Airflow调度程序的时候，程序第一次运行的时间为:`start_date`加上一个周期的`scheduler_interval`
     当设置的`start_date`为`2020-06-18 15:16:00`加上一个周期时间5分钟，时间变为`2020-06-18 15:21:00`，时间表， 在未来离这个时间最近时间点为:`2020-06-18 15:25:00`，所以我测试的第一次执行的时间为:`2020-06-18 15:25:00`
        接下来我们测试另外一个脚本:
          当前现实时间:`2020-06-18 15:44:00`
          `start_date:2020-06-18 15:46:00`
          `schedular_interval:*/2 * * * *`
        这么做的目的是因为`schedular_interval`为2分钟执行一次，start_date刚好卡在这个点上，能否在这个`start_date`点执行，即`2020-06-18 15:46:00`进行程序的第一次执行。
   然而它第一次的执行时间为:`2020-06-18 15:48:00`，也印证了Airflow调度程序的时候第一次执行的时间为:`start_date+schedular_interval`

### 5.1.2 execution_date(上一个时间间隔的开始时间)

https://stackoverflow.com/questions/50093718/airflow-python-script-with-execution-date-in-op-kwargs

### 5.1.3 总结

1. Airflow调度程序的时候第一次执行的时间为:`start_date+schedular_interval`后，在未来离这个时间最近的时间间隔开始时间点；`execution_date`为上一个时间间隔的开始时间，他的含义是本次要执行的任务的数据范围的开始时间

2. 在 Airflow 中运行的每个 DAG 都有一个分配的“数据间隔”，代表其运行的时间范围。DAG 运行通常在其关联的数据间隔结束后进行调度，execution_date代表这个时间间隔的开始时间。用上面的方法1推断第一次执行时间，第一次执行时间-`schedular_interval`=`execution_date`

3. ![airflow时间概念](/Users/fanqingwei/Desktop/学习/airflow/images/airflow时间概念.png)

   run_id scheduled_xxxx时间应该和Execution_date一样，只是代码里生成run_id时没有转换时区(+00:00是UTC时间)，CST(+08:00)东八区

## 5.2 时区问题

### 问题一

#### execution_date时区没有更改

虽然修改了airflow.cfg配置里的时区设置，并且UI和调度都会以对应时区运行，但是dag任务里的变量还是以UTC格式存在，使用时需要自己加8个时区

例如：

```python
from airflow import DAG
from airflow.operators.bash import BashOperator
from datetime import datetime, timedelta

default_args = {
    'owner': 'airflow',
    'depends_on_past': False,
    'start_date': datetime(2021, 12, 1),
    'email': ['2734804851@qq.com'],
    'email_on_failure': False,
    'email_on_retry': False,
    'retries': 1,
    'retry_delay': timedelta(minutes=1),
    # 'queue': 'bash_queue',
    # 'pool': 'backfill',
    # 'priority_weight': 10,
    # 'end_date': datetime(2016, 1, 1),
}

dag = DAG('non_mobile_sett', default_args=default_args, schedule_interval=timedelta(days=1))

t1_1 = BashOperator(
    task_id='count_wholesale',
    # bash_command='echo `date +"%Y-%m-%d %H:%M:%S"` >> /root/airflow/dags/1.txt',
    bash_command='echo {{ execution_date }} >> /root/airflow/dags/1.txt',
    dag=dag)
```

![时区问题](/Users/fanqingwei/Desktop/学习/airflow/images/时区问题.png)

输出 execution_date发现Execution Date是UTC时区，差八个小时

```shell
(python37) [root@VM-236-231-centos ~/airflow/dags]# vim 1.txt
2021-11-30T16:00:00+00:00
2021-12-01T16:00:00+00:00
2021-12-02T16:00:00+00:00
2021-12-03T16:00:00+00:00
2021-12-04T16:00:00+00:00
2021-12-06T07:11:19.004894+00:00
```

#### 解决

手工加八个小时，再格式化日期

```python
from airflow import DAG
from airflow.operators.bash import BashOperator
from datetime import datetime, timedelta

default_args = {
    'owner': 'airflow',
    'depends_on_past': False,
    'start_date': datetime(2021, 12, 1),
    'email': ['2734804851@qq.com'],
    'email_on_failure': False,
    'email_on_retry': False,
    'retries': 1,
    'retry_delay': timedelta(minutes=1),
    # 'queue': 'bash_queue',
    # 'pool': 'backfill',
    # 'priority_weight': 10,
    # 'end_date': datetime(2016, 1, 1),
}

dag = DAG('non_mobile_sett', default_args=default_args, schedule_interval=timedelta(days=1))

t1_1 = BashOperator(
    task_id='count_wholesale',
    # bash_command='echo `date +"%Y-%m-%d %H:%M:%S"` >> /root/airflow/dags/1.txt',
    bash_command='echo {{ (execution_date + macros.timedelta(hours=8)).strftime("%Y-%m-%d") }} >> /root/airflow/dags/1.txt',
    dag=dag)
```

#### 结果

```shell
[root@VM-236-231-centos ~/airflow/dags]# vim 1.txt
2021-12-03
2021-12-01
2021-12-06
2021-12-02
2021-12-05
2021-12-04
2021-12-06
```



## 5.3 DAG 运行

### 5.3.1 定时预设

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

#### 数据间隔

在 Airflow 中运行的每个 DAG 都有一个分配的“数据间隔”，代表其运行的时间范围。例如，对于使用 调度的 DAG `@daily`，其每个数据间隔将在每天的午夜开始并在第二天的午夜结束.

DAG 运行通常*在*其关联的数据间隔结束*后*进行调度，以确保运行能够收集该时间段内的所有数据。换句话说，覆盖2020-01-01数据周期的运行一般不会在2020-01-01结束之前开始运行，即在2020-01-02 00:00:00之后。

Airflow 中的所有日期都以某种方式与数据间隔概念相关联。`execution_date`例如，DAG 运行的“逻辑日期”（在 2.2 之前的 Airflow 版本中也称为）表示数据间隔的开始，而不是实际执行 DAG 的时间。

同样，由于`start_date`DAG 及其任务的参数指向相同的逻辑日期，因此它标志着*DAG 第一个数据间隔的开始*，而不是*DAG 中的*任务何时开始运行。换句话说，DAG 运行只会在 之后的一个时间间隔内安排`start_date`。

### 5.3.2 重新运行 DAG

在某些情况下，您可能希望再次执行 DAG。其中一种情况是计划的 DAG 运行失败。

#### 追赶

带有`start_date`，可能是 `end_date`和 a 的 Airflow DAG `schedule_interval` 定义了一系列间隔，调度程序将这些间隔转换为单独的 DAG 运行和执行。默认情况下，调度程序将为自上次数据间隔以来未运行（或已清除）的任何数据间隔启动 DAG 运行。这个概念称为追赶。

如果您的 DAG 没有被写入来处理它的追赶（即，不限于间隔，而是`Now`例如），那么您将需要关闭追赶。这可以通过`catchup = False`在 DAG 或`catchup_by_default = False` 配置文件中设置来完成。关闭时，调度程序仅在最近的时间间隔内创建 DAG 运行。

```python
"""
Code that goes along with the Airflow tutorial located at:
https://github.com/apache/airflow/blob/main/airflow/example_dags/tutorial.py
"""
from airflow.models.dag import DAG
from airflow.operators.bash import BashOperator
from datetime import datetime, timedelta


default_args = {
    "owner": "airflow",
    "depends_on_past": False,
    "email": ["airflow@example.com"],
    "email_on_failure": False,
    "email_on_retry": False,
    "retries": 1,
    "retry_delay": timedelta(minutes=5),
}

dag = DAG(
    "tutorial",
    default_args=default_args,
    start_date=datetime(2015, 12, 1),
    description="A simple tutorial DAG",
    schedule_interval="@daily",
    catchup=False,
)
```

在上面的示例中，如果调度程序守护程序在 `2016-01-02 早上 6 点`（或从命令行）获取了 DAG，将使用 `2016-01-01` 和`2016-01-02`，下一个将在 `2016-01-03` 上午的午夜之后创建，数据间隔在` 2016-01-02` 和 `2016-01-03` 之间。

如果取而代之的是该 `dag.catchup` 值`True`，则调度程序将为 `2015 年 12 月 1` 日和 `2016 年 1 月 2 日`之间的每个已完成时间间隔创建一个 DAG 运行（但对于 `2016 年 1 月 2 日`还不是一个，因为该时间间隔尚未完成） ) 并且调度程序将按顺序执行它们。

当您在指定时间段内关闭 DAG 然后重新启用它时，也会触发 Catchup。

这种行为非常适合可以轻松拆分为多个句点的原子数据集。如果您的 DAG 在内部执行追赶，那么关闭追赶会很棒。

#### 回填

可能存在这样的情况，您可能希望在指定的历史时期运行 DAG，例如，填充 DAG 的数据是使用`start_date` **2019-11-21**创建的，但另一个用户需要一个月前的输出数据，即**2019-10- 21** . 此过程称为回填。

即使在禁用追赶的情况下，您也可能希望回填数据。这可以通过 CLI 完成。运行以下命令

```shell
airflow dags backfill \
    --start-date START_DATE \
    --end-date END_DATE \
    dag_id
```

该[回填命令](https://airflow.apache.org/docs/apache-airflow/stable/cli-and-env-variables-ref.html#backfill)将重新运行dag_id的所有实例的开始日期和结束日期内的所有区间。

#### 重新运行任务

在计划运行期间，某些任务可能会失败。在查看日志后修复错误后，您可以通过在预定日期清除它们来重新运行任务。清除任务实例不会删除任务实例记录。相反，它更新`max_tries`到`0`，并将当前任务实例状态`None`，这将导致任务重新运行。

在树或图表视图中单击失败的任务，然后单击**清除**。执行程序将重新运行它。

您可以选择多个选项来重新运行 -

- **过去**- 在 DAG 最近的数据间隔之前运行中的任务的所有实例
- **Future** - 在 DAG 最近的数据间隔之后运行的任务的所有实例
- **Upstream** - 当前 DAG 中的上游任务
- **Downstream** - 当前 DAG 中的下游任务
- **递归**- 子 DAG 和父 DAG 中的所有任务
- **失败**- 仅 DAG 最近运行中失败的任务

您还可以使用以下命令通过 CLI 清除任务：

```shell
airflow tasks clear dag_id \
    --task-regex task_regex \
    --start-date START_DATE \
    --end-date END_DATE
```

对于指定的`dag_id`时间间隔，该命令会清除与正则表达式匹配的任务的所有实例。有关更多选项，您可以查看[clear 命令](https://airflow.apache.org/docs/apache-airflow/stable/cli-ref.html#clear)的帮助：

```shell
airflow tasks clear --help
```

### 5.3.3 外部触发器

请注意，也可以通过 CLI 手动创建 DAG 运行。只需运行命令 -

```shell
airflow dags trigger --exec-date logical_date run_id
```

在调度程序外部创建的 DAG 运行与触发器的时间戳相关联，并与计划的 DAG 运行一起显示在 UI 中。可以使用`-e`参数指定在 DAG 内部传递的逻辑日期。默认值为 UTC 时区中的当前日期。

此外，您还可以使用 Web UI 手动触发 DAG 运行（选项卡**DAG** -> 列**链接**-> 按钮**触发 Dag**）

#### 触发 dag 时传递参数

从 CLI、REST API 或 UI 触发 DAG 时，可以将 DAG 运行的配置作为 JSON blob 传递。

参数化 DAG 的示例：

```python
from airflow import DAG
from airflow.operators.bash import BashOperator
from airflow.utils.dates import days_ago

dag = DAG("example_parameterized_dag", schedule_interval=None, start_date=days_ago(2))

parameterized_task = BashOperator(
    task_id="parameterized_task",
    bash_command="echo value: {{ dag_run.conf['conf1'] }}",
    dag=dag,
)
```

**注意**： from 的参数`dag_run.conf`只能用于操作符的模板字段。

##### 使用命令行界面

```shell
airflow dags trigger --conf '{"conf1": "value1"}' example_parameterized_dag
```

##### 使用用户界面

![_images/example_passing_conf.png](https://airflow.apache.org/docs/apache-airflow/stable/_images/example_passing_conf.png)

### 5.3.4 要记住

- 可以通过 UI 将任务实例标记为失败。这可用于停止运行任务实例。
- 可以通过 UI 将任务实例标记为成功。这主要是为了修复误报，或者例如，当修复已在 Airflow 之外应用时。

### 5.3.5 获取前端配置参数



## 6. 控制流

默认情况下，DAG 只会在它所依赖的所有任务都成功时才运行一个任务。但是，有几种方法可以修改它：

- [分支](https://airflow.apache.org/docs/apache-airflow/stable/concepts/dags.html#concepts-branching)，您可以在其中根据条件选择要移动到的任务
- [仅最新](https://airflow.apache.org/docs/apache-airflow/stable/concepts/dags.html#concepts-latest-only)，一种特殊形式的分支，仅在与当前运行的 DAG 上运行
- [Depends On Past](https://airflow.apache.org/docs/apache-airflow/stable/concepts/dags.html#concepts-depends-on-past)，其中任务可以依赖于*之前运行的*自身
- [Trigger Rules](https://airflow.apache.org/docs/apache-airflow/stable/concepts/dags.html#concepts-trigger-rules)，可让您设置 DAG 运行任务的条件。

### 6.1 分枝

您可以使用分支来告诉 DAG*不要*运行所有相关任务，而是选择一个或多个路径进行下去。这就是分支运算符的用武之地。

该`BranchPythonOperator`是非常相似，但它预计PythonOperator一个`python_callable`返回一个TASK_ID（或task_ids的列表）。遵循返回的 task_id，并跳过所有其他路径。

Python 函数返回的 task_id 必须直接引用 BranchPythonOperator 任务的下游任务。

笔记

当一个任务是两个分支运营商的下游*和*更多的选择的任务之一的下游，它不会被跳过：

![../_images/branch_note.png](https://airflow.apache.org/docs/apache-airflow/stable/_images/branch_note.png)

分支任务的路径是`branch_a`,`join`和`branch_b`。由于`join`是 的下游任务`branch_a`，它仍然会运行，即使它没有作为分支决策的一部分返回。

该`BranchPythonOperator`还可以与XComs允许分支上下文来动态决定跟随基于上游的任务是什么分支使用。例如：

```python
def branch_func(ti):
    xcom_value = int(ti.xcom_pull(task_ids="start_task"))
    if xcom_value >= 5:
        return "continue_task"
    else:
        return "stop_task"


start_op = BashOperator(
    task_id="start_task",
    bash_command="echo 5",
    xcom_push=True,
    dag=dag,
)

branch_op = BranchPythonOperator(
    task_id="branch_task",
    python_callable=branch_func,
    dag=dag,
)

continue_op = DummyOperator(task_id="continue_task", dag=dag)
stop_op = DummyOperator(task_id="stop_task", dag=dag)

start_op >> branch_op >> [continue_op, stop_op]
```

如果您希望实现自己的具有分支功能的运算符，您可以继承 from [`BaseBranchOperator`](https://airflow.apache.org/docs/apache-airflow/stable/_api/airflow/operators/branch/index.html#airflow.operators.branch.BaseBranchOperator)，其行为类似于`BranchPythonOperator`但希望您提供方法的实现`choose_branch`。

与可调用 for 一样`BranchPythonOperator`，此方法应返回下游任务的 ID 或任务 ID 列表，这些任务将被运行，而其他所有任务都将被跳过：

```python
class MyBranchOperator(BaseBranchOperator):
    def choose_branch(self, context):
        """
        Run an extra branch on the first day of the month
        """
        if context['data_interval_start'].day == 1:
            return ['daily_task_id', 'monthly_task_id']
        else:
            return 'daily_task_id'
```

### 6.2 仅最新

Airflow 的 DAG Runs 通常在与当前日期不同的日期运行 - 例如，为上个月的每一天运行一个 DAG 副本以回填一些数据。

有一些情况，不过，在那里你*不*希望让一个以前的日期DAG运行的部分（或全部）部分; 在这种情况下，您可以使用`LatestOnlyOperator`.

如果您不在“最新”的 DAG 运行中（如果挂钟时间现在在它的 execution_time 和下一个计划的 execution_time 之间，并且它不是外部触发的运行），那么这个特殊的 Operator 会跳过其下游的所有任务。

下面是一个例子：

气流/example_dags/example_latest_only_with_trigger.py[查看源代码](https://airflow.apache.org/docs/apache-airflow/stable/_modules/airflow/example_dags/example_latest_only_with_trigger.html)

```python
import datetime as dt

from airflow import DAG
from airflow.operators.dummy import DummyOperator
from airflow.operators.latest_only import LatestOnlyOperator
from airflow.utils.trigger_rule import TriggerRule

with DAG(
    dag_id='latest_only_with_trigger',
    schedule_interval=dt.timedelta(hours=4),
    start_date=dt.datetime(2021, 1, 1),
    catchup=False,
    tags=['example3'],
) as dag:
    latest_only = LatestOnlyOperator(task_id='latest_only')
    task1 = DummyOperator(task_id='task1')
    task2 = DummyOperator(task_id='task2')
    task3 = DummyOperator(task_id='task3')
    task4 = DummyOperator(task_id='task4', trigger_rule=TriggerRule.ALL_DONE)

    latest_only >> task1 >> [task3, task4]
    task2 >> [task3, task4]
```

在此 DAG 的情况下：

- `task1`直接在下游，`latest_only`除了最新的运行之外，所有运行都将被跳过。
- `task2`完全独立于`latest_only`并将在所有预定时间段内运行
- `task3`是的下游`task1`和`task2`和，因为默认的[触发规则](https://airflow.apache.org/docs/apache-airflow/stable/concepts/dags.html#concepts-trigger-rules)的存在`all_success`会收到一个级联从跳过`task1`。
- `task4`位于`task1`and 的下游`task2`，但不会被跳过，因为它`trigger_rule`被设置为`all_done`。

![../_images/latest_only_with_trigger.png](https://airflow.apache.org/docs/apache-airflow/stable/_images/latest_only_with_trigger.png)

### 6.3 取决于过去

你也可以说，如果一个任务只能运行*以前*在以前的DAG运行任务的运行成功。要使用它，您只需`depends_on_past`将 Task 上的参数设置为`True`.

请注意，如果您在 DAG 生命周期的一开始就运行它——特别是它的第一次*自动*运行——那么任务仍然会运行，因为没有以前的运行依赖。

### 4.4 触发规则

默认情况下，Airflow 将在运行该任务之前等待所有上游任务[成功](https://airflow.apache.org/docs/apache-airflow/stable/concepts/tasks.html#concepts-task-states)。

但是，这只是默认行为，您可以使用`trigger_rule`Task的参数来控制它。的选项`trigger_rule`是：

- `all_success` （默认）：所有上游任务都已成功
- `all_failed`: 所有上游任务都处于`failed`或`upstream_failed`状态
- `all_done`：所有上游任务都完成了它们的执行
- `one_failed`: 至少有一个上游任务失败（不等待所有上游任务完成）
- `one_success`: 至少有一个上游任务成功（不等待所有上游任务完成）
- `none_failed`: 所有上游任务都没有`failed`或`upstream_failed`- 即所有上游任务都成功或被跳过
- `none_failed_min_one_success`：所有上游任务都没有`failed`或`upstream_failed`，并且至少有一个上游任务成功。
- `none_skipped`：没有上游的任务是在一个`skipped`状态-也就是说，所有上游的任务是在一个`success`，`failed`或`upstream_failed`状态
- `always`: 完全没有依赖，随时运行这个任务

如果您愿意，您还可以将其与“[依赖过去”](https://airflow.apache.org/docs/apache-airflow/stable/concepts/dags.html#concepts-depends-on-past)功能结合使用。

笔记

了解触发规则和跳过的任务之间的交互非常重要，尤其是作为分支操作的一部分跳过的任务。*您几乎从不想在分支操作的下游使用 all_success 或 all_failed*。

跳过的任务将通过触发规则`all_success`和级联`all_failed`，并导致它们也跳过。考虑以下 DAG：

```python
# dags/branch_without_trigger.py
import datetime as dt

from airflow.models import DAG
from airflow.operators.dummy import DummyOperator
from airflow.operators.python import BranchPythonOperator

dag = DAG(
    dag_id="branch_without_trigger",
    schedule_interval="@once",
    start_date=dt.datetime(2019, 2, 28),
)

run_this_first = DummyOperator(task_id="run_this_first", dag=dag)
branching = BranchPythonOperator(
    task_id="branching", dag=dag, python_callable=lambda: "branch_a"
)

branch_a = DummyOperator(task_id="branch_a", dag=dag)
follow_branch_a = DummyOperator(task_id="follow_branch_a", dag=dag)

branch_false = DummyOperator(task_id="branch_false", dag=dag)

join = DummyOperator(task_id="join", dag=dag)

run_this_first >> branching
branching >> branch_a >> follow_branch_a >> join
branching >> branch_false >> join
```

`join`是`follow_branch_a`和 的下游`branch_false`。该`join`任务将显示为已跳过，因为它默认`trigger_rule`设置为`all_success`，并且由分支操作引起的跳过向下级联以跳过标记为 的任务`all_success`。


![../_images/branch_without_trigger.png](https://airflow.apache.org/docs/apache-airflow/stable/_images/branch_without_trigger.png)

通过在任务中设置`trigger_rule`为，我们可以获得预期的行为：`none_failed_min_one_success join`

![../_images/branch_with_trigger.png](https://airflow.apache.org/docs/apache-airflow/stable/_images/branch_with_trigger.png)

## 7. XComs

