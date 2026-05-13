db.createUser({
    user: 'María',
    pwd: 'password',
    customData: { startDate: new Date() },
    roles: [
        { role: 'clusterAdmin', db: 'admin' },
        { role: 'readAnyDatabase', db: 'admin' },
        'readWrite'
    ]
})


db.books.insertOne({
    'name': 'Blink',
    'startDate': new Date(),
    'authors': [
        {'name': 'Malcolm Gladwell'},
        {'name': 'Ghost Writer'}
    ]
})


db.books.find().pretty() //dentro de find poner lo que quieres buscar
db.books.find(
    {
        name: 'OOP Programming'
    },
    {
        _id: 0,
        publishedDate: 1,
        authors: 1
    }
)


db.books.find(
    {
        name: 'Blink'
    },
    {
        startDate: 1,
        name: 1,
        authors: {$slice: 1} //poner el que quieras que aparezca
    }
).pretty()


db.books.find({'name':'OOP Programming'})

db.books.findOne({name: /.*lo que busques.*/i})

db.books.find({name:{$exists:true}})