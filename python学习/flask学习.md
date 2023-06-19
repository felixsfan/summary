# 1.连接的关闭

## 1.1 Flask应用程序上下文来管理

Flask-SQLAlchemy会自动管理数据库连接，并在请求结束时自动关闭连接。这是因为Flask-SQLAlchemy使用了Flask应用程序上下文来管理数据库连接，从而避免了手动管理连接的繁琐和容易出错的问题。

具体来说，当使用Flask-SQLAlchemy进行数据库操作时，可以直接使用db.session对象来进行操作，而无需手动创建Session对象或Engine对象。例如：

```python
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://user:password@host/db'
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)

@app.route('/')
def index():
    user = User.query.filter_by(name='John').first()
    return 'Hello, {}!'.format(user.name)
```

在这个示例中，我们使用了Flask-SQLAlchemy提供的db.session对象来进行数据库操作，而无需手动创建Session对象或Engine对象。当请求结束时，Flask-SQLAlchemy会自动关闭连接，从而避免了连接池中的连接被占用的问题。

总之，Flask-SQLAlchemy会自动管理数据库连接，并在请求结束时自动关闭连接，从而避免了手动管理连接的繁琐和容易出错的问题。

## 1.2 自己创建的

```
from flask import current_app
from sqlalchemy.orm import sessionmaker

from common import ResultCode
from web_api.app import db

class NonMobileUDao(object):
    def __init__(self):
        self.db = db
        self.month_db_engine = self.db.get_engine(app=current_app, bind="month_db")
        self.session_factory = sessionmaker(bind=self.month_db_engine)
        self.month_db_session = self.session_factory()

        self.month_db_engine_latin1 = self.db.get_engine(app=current_app, bind="month_db_latin1")
        self.session_factory_latin1 = sessionmaker(bind=self.month_db_engine_latin1)
        self.month_db_session_latin1 = self.session_factory_latin1()
```



# 2.创建连接方式

## 2.1 原生

```
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://user:password@host/db'
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)

@app.route('/')
def index():
    user = User.query.filter_by(name='John').first()
    return 'Hello, {}!'.format(user.name)
```

## 2.2 方式二

```
db_uri = current_app.config['SQLALCHEMY_BINDS']['db1']
engine = create_engine(db_uri)
Session = sessionmaker(bind=engine)
session = Session()
```

第一种方式使用了 create_engine() 方法创建了一个数据库连接的引擎对象，并使用 sessionmaker() 方法创建了一个会话工厂，
从而创建了一个会话对象。这种方式适用于一次性查询，它会在每次执行查询时创建一个新的连接，并在查询结束后自动关闭连接。
这种方式的优点是简单易用，但缺点是每次查询都需要创建一个新的连接，可能会影响系统的性能。

## 2.3方式三

```
self.db = db
self.month_db_engine = self.db.get_engine(app=current_app, bind="month_db")
self.session_factory = sessionmaker(bind=self.month_db_engine)
self.month_db_session = self.session_factory()
```

第二种方式使用了 Flask SQLAlchemy 的 db.get_engine() 方法获取了一个数据库连接的引擎对象，
并使用 sessionmaker() 方法创建了一个会话工厂，从而创建了一个会话对象。这种方式适用于需要长时间保持连接的情况，
例如在事务中执行多个查询。在这种情况下，您可以使用 db.get_engine() 方法获取一个已经存在的连接，并使用这个连接执行多个查询。
这种方式的优点是可以避免每次查询都创建一个新的连接，从而提高了系统的性能。



# 3. engine、session、sessionmaker的区别和联系

https://blog.csdn.net/qq_36622490/article/details/109850409

## 3.1 Engine

Engine 是 SQLAlchemy 的核心组件，负责与数据库进行通信。它管理底层的数据库连接池和事务。在 Flask-SQLAlchemy 中，当您设置 `SQLALCHEMY_DATABASE_URI` 时，它会自动为您创建一个 Engine。例如：

```python
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///example.db'
```

这里，我们告诉 Flask-SQLAlchemy 使用 SQLite 数据库，并将数据文件存储在名为 `example.db` 的文件中。Flask-SQLAlchemy 会根据这个配置创建一个 Engine 实例。

## 3.2 Session

Session 是 SQLAlchemy ORM 的主要入口点，用于与数据库进行交互。它负责管理数据库事务、缓存对象和跟踪对象的更改。在 Flask-SQLAlchemy 中，您将使用 Session 对象执行 CRUD（创建、读取、更新和删除）操作。例如：

```python
# 添加一个新用户
new_user = User(username='John', email='john@example.com')
db.session.add(new_user)
db.session.commit()

# 查询用户
user = User.query.filter_by(username='John').first()
print(user)
```

在这个示例中，我们使用 `db.session`（一个 Session 实例）添加和查询用户。注意，我们需要调用 `db.session.commit()` 以将更改提交到数据库。

## 3.3 Sessionmaker

Sessionmaker 是一个工厂函数，用于生成新的 Session 实例。在 Flask-SQLAlchemy 中，您可以使用 `scoped_session` 函数创建一个线程安全的 Sessionmaker，以确保每个请求都有一个独立的 Session。例如：

```python
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy import create_engine

engine = create_engine('sqlite:///example.db')
session_factory = sessionmaker(bind=engine)
Session = scoped_session(session_factory)
```

在这个示例中，我们首先创建了一个 Engine 实例，然后使用 `sessionmaker` 函数创建了一个 Session 工厂。接着，我们使用 `scoped_session` 函数创建了一个线程安全的 Sessionmaker，它会为每个请求生成一个新的 Session 实例。

在 Flask-SQLAlchemy 中，这些步骤会自动完成。当您使用 `db.session` 时，它会从 Sessionmaker 获取一个新的 Session 实例，并确保每个请求都有一个独立的 Session。同时，Engine 会在后台处理与数据库的连接和 SQL 语句的执行。

总之，Engine、Session 和 Sessionmaker 是 SQLAlchemy 中的核心组件，它们在 ORM（对象关系映射）中起到关键作用。在 Flask-SQLAlchemy 中，这些组件会自动创建和配置，使得您可以专注于编写应用程序逻辑。