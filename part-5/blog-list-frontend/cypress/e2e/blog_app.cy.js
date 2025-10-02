describe('BLOG APP', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: "mluukkai",
      password: "salainen",
      name: "Matti Luukkainen"
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })
  it('Login form is shown', function () {
    cy.contains('log in to application')
    cy.contains('login')
  })
  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('Matti Luukkainen logged in')
    })
    it('fails with wrong credentials', function () {
      cy.get('#username').type('mluukai')
      cy.get('#password').type('slainen')
      cy.get('#login-button').click()
      cy.contains('wrong username or password')
    })
  })
  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })
    it('a blog can be created', function () {
      cy.get('#new-blog-button').click()
      cy.get('#title').type('First class tests')
      cy.get('#author').type('Robert C. Martin')
      cy.get('#url').type('http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html')
      cy.get('#create-button').click()
      cy.contains('a new blog First class tests by Robert C. Martin added')
      cy.get('#blog').find('button')
    })
    describe('and when a new blog has been created', function () {
      beforeEach(function () {
        cy.createBlog({
          title: "First class tests",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html",
          likes: 10
        })
      })
      it('it can be liked', function () {
        cy.get('#view-button').click()
        cy.contains('like').click()
      })
      it('it can be deleted', function () {
        cy.get('#view-button').click()
        cy.contains('remove').click()
        cy.get('#root').should('not.contain', '#blog')
      })
    })
    describe('and multiple blogs have been added', function () {
      it('they are sorted by likes', function () {
        cy.createBlog({
          title: "TDD harms architecture",
          author: "Robert C. Martin",
          url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
          likes: 0
        })
        cy.createBlog({
          title: "Canonical string reduction",
          author: "Edsger W. Dijkstra",
          url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
          likes: 12
        })
        cy.createBlog({
          title: "React patterns",
          author: "Michael Chan",
          url: "https://reactpatterns.com/",
          likes: 7
        })
        cy.get('[id^=view-button]').click({ multiple: true })
        cy.get('[id^=blog]').eq(0).contains('12')
        cy.get('[id^=blog]').eq(1).contains('7')
        cy.get('[id^=blog]').eq(2).contains('0')
        for (let i = 0; i < 8; i++) {
          cy.get('[id^=blog]').eq(2).contains('like').click().wait(10)
        }
        for (let i = 0; i < 5; i++) {
          cy.get('[id^=blog]').eq(1).contains('like').click().wait(10)
        }
        cy.get('[id^=blog]').eq(0).contains('13')
        cy.get('[id^=blog]').eq(1).contains('12')
        cy.get('[id^=blog]').eq(2).contains('7')
      })
    })
  })
})