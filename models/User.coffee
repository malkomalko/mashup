app: require '../lib/boot'

Mongoose.Model.define 'User', {
  collection: 'users'

  types: {
    first: String
    last: String
    bio: {
      phoneNumber: Number
    }
    likes: Array
  }

  indexes: [
    'first'
    'last'
    'bio.phoneNumber'
    [['first'],['last']]
  ]

  static: {
    homePage: (e) ->
      @find().limit(500).each (doc) ->
        @partial(doc)
      .then (docs) =>
        e.contentType 'json'
        e.respond(200, JSON.encode docs)
        
    seeds: {
      defaults: (e) ->
        data: []
        for i in [1..20000]
          data.push {
            first: app.Faker.Name.findName().split(' ',2)[0]
            last: app.Faker.Name.findName().split(' ',2)[1]
            bio: { phoneNumber: app.Faker.PhoneNumber.phoneNumber() }
            likes: [
              app.Faker.Company.catchPhrase()
              app.Faker.Company.catchPhrase()
              app.Faker.Company.catchPhrase()
              app.Faker.Company.catchPhrase()
              app.Faker.Company.catchPhrase()
            ]
          }
        app.models.User.insert(data).exec (docs) ->
        e.contentType 'json'
        e.respond(200)
    }
  }

  methods: {

  }

  setters: {
    first: (v) ->
      v.toUpperCase()
  }

  getters: {
    legalDrinkingAge: ->
      if @bio.age >= 21 then true else false

    fullName: ->
      @first + ' ' + @last
  }
}
