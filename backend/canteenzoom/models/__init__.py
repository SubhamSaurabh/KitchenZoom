from .meta import Base

def createTables(engine):
    print("Binding")
    Base.metadata.bind = engine
    print("binding done")
    Base.metadata.create_all(engine)

def destroyTables(engine):
    Base.metadata.drop_all(engine)