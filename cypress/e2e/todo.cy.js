describe('todo test',()=>{
    it('can add todo',()=>{
        cy.visit('http://localhost:3000/')

        cy.findByRole('textbox').type('to eat');
        cy.findByRole('button', {
            name: /add/i
          }).click();

        cy.findByRole('textbox').type('to drink');
        cy.findByRole('button', {
              name: /add/i
            }).click();
        
        cy.get(':nth-child(2) > .todoAction > [data-testid="editBtn"] > svg').click();
        cy.get(':nth-child(3) > .todoAction > [data-testid="editBtn"]').click();
        cy.get(':nth-child(2) > .todoText > [data-testid="edit-form"] > [data-testid="edit-form-input"]').type('update');
        cy.get(':nth-child(3) > .todoText > [data-testid="edit-form"] > [data-testid="edit-form-input"]').type('new todo');
        cy.get(':nth-child(3) > .todoAction > [data-testid="cancelEdit"]').click();
        cy.get(':nth-child(2) > .todoAction > [data-testid="completeEdit"]').click();
        cy.get(':nth-child(2) > .todoAction > [data-testid="completeBtn"] > svg > path').click();
        cy.get('[data-testid="complete-container"] > [data-testid="todo-item"] > .todoAction > [data-testid="delBtn"] > svg').click();
        
        cy.get('[data-testid="delBtn"]').click();
    })
})