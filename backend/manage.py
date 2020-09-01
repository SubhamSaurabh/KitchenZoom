import click

@click.group()
def cli():
    '''Welcome the to cli for managing canteenzoom Server'''
    pass


def addadmin():
    "Seed Admin data for testing"
    from server import SQLSession
    from studyzoom.models.userModel import User
    import datetime
    import uuid
    session = SQLSession()
    admin = User(
        email="admin@canteenzoom.com",
        public_id=str(uuid.uuid4()),
        username="admin",
        password="canteenadminpassword",
        registered_on=datetime.datetime.utcnow(),
        admin=True,
        varified=True
    )
    session.add(admin)
    session.commit()
    session.close()

@click.command()
def initdb():
    from server import engine, createTables
    createTables(engine)
    click.echo('Initialized the database')

@click.command()
def dropdb():
    from server import engine, destroyTables
    destroyTables(engine)
    click.echo('Dropped the database')

@click.command()
def admin():
    addadmin()
    click.echo('Admin added')

cli.add_command(initdb)
cli.add_command(dropdb)
cli.add_command(admin)


if __name__ == '__main__':
    cli()
