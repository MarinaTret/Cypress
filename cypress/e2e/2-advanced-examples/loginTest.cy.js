describe("Авторизация", () => {
    beforeEach( () => {
        cy.visit("/");
    });

    it("Успешная авторизация", () => {
        cy.contains("Log in").click();
        cy.login("bropet@mail.ru", "123");
        cy.contains("Добро пожаловать").should("be.visible", true);
    });

    it("Авторизация без логина", () => {
        cy.contains("Log in").click();
        cy.login(null, "123");
        cy.get("#mail").then((elements) => {
            expect(elements[0].checkValidity()).to.be.false;
            expect(elements[0].validationMessage).to.be.eql("Заполните это поле.");
        })
    });

    it("Авторизация без пароля", () => {
        cy.contains("Log in").click();
        cy.login("bropet@mail.ru", null);
        cy.get("#pass").then((elements) => {
            expect(elements[0].checkValidity()).to.be.false;
            expect(elements[0].validationMessage).to.be.eql("Заполните это поле.");
        })
    });

    describe("Добавление и удаление книг", () => {
        beforeEach(() => {
          cy.visit("/");
          cy.contains("Log in").click();
          cy.login("bropet@mail.ru", "123");
        });
      
        it("Добавление книги", () => {
          cy.addBook("Программист-прагматик", "Классические книги для программиста", "Дэвид Томас, Эндрю Хант");
          cy.contains("Дэвид Томас, Эндрю Хант").should("be.visible");
        });
      
        it("Добавление книги в избранное", () => {
          cy.addBookFavourite("Программист-прагматик", "Классические книги для программиста", "Дэвид Томас, Эндрю Хант");
          cy.get("h4").click();
          cy.contains("Дэвид Томас, Эндрю Хант").should("be.visible");
        });
      
        it("Удаление книги из избранного", () => {
          cy.addBookFavourite("Программист-прагматик", "Классические книги для программиста", "Дэвид Томас, Эндрю Хант");
          cy.get("h4").click();
          cy.contains("Delete from favorite").click();
          cy.contains("Программист-прагматик").should("not.exist");
        });
    });
})