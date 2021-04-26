
const Modal = {
    open() {
        //Abrir modal
        //Adicionar a class active ao modal
        document
            .querySelector('.modal-overlay') //documento pesquise dentro de você pelo seletor que eu vou colocar ali dentro
            .classList
            .add('active')
    },
    close(){
        //fechar o modal
        //remover a class active do modal
        document
            .querySelector('.modal-overlay')
            .classList
            .remove('active')

    }
}

// responsável pelo cálculo matemático
const Transaction = {
    all: [{
        description: 'Luz',
        amount: -50001,
        date: '23/01/2021',
    },
    {
        description: 'Website',
        amount: '50000',
        date: '23/01/2021',
    },
    {
        description: 'Internet',
        amount: -20012,
        date: '23/01/2021',
    },
    {
        description: 'App',
        amount: 20000,
        date: '23/01/2021',
    },
    ], 
        
    add(transaction){
        Transaction.all.push(transaction)

        App.reload()
    },
    
    remove(index) {
        Transaction.all.splice(index, 1)

        App.reload()
    },


    incomes() {
        let income = 0;
        // pegar todas as transações
        // para cada transação
        Transaction.all.forEach(transaction => { 
            // se ela for maior que zero 
            // retornar a variáveis
            if (transaction.amount > 0 ) {
                income += transaction.amount;
            }  
        })
        return income;
    },

    expenses() {
        let expense = 0;
        //pegar todas as transações
        // para cada transação
        Transaction.all.forEach(transaction => {
            // se for menor que zero
            if (transaction.amount < 0) {
                //subtrair a uma variável e retornar a variável
                expense += transaction.amount;
            }
        })
        return expense;
    },

    total() {
        return Transaction.incomes() + Transaction.expenses();
    }

}

// Substituir os dados do HTML com os dados do JS
const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'), //busquei no html

    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)
        
        DOM.transactionsContainer.appendChild(tr)

    }, 
    innerHTMLTransaction(transaction) {
        const CSSclass= transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transaction.amount)

        const html = `
        <tr>
            <!--linha-->
            <td class="descriptions" >${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
                <img src="assets/minus.svg" alt="Remover transação">
            </td>
        </tr>
        `

        return html

    }, 

    updateBalance() {
        document
            .getElementById('incomeDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.incomes())
        document
            .getElementById('expenseDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.expenses())
        document
            .getElementById('totalDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.total())
    }, 
    clearTransacitons() {
        DOM.transactionsContainer.innerHTML = ""
    }
}

const Utils = {
    formatAmount(value) {
        value = Number(value) * 100
        
        return value
    },

    formatDate(date) {
        console.log(date)
    },

    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g, "")

        value = Number (value) / 100

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        })

        return signal + value 
    }
}

const Form = {
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    getValues() {
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value 
        }
    },
    validateFields() {
        const {description, amount, date} = Form.getValues()

        if (description.trin() === "" ||
            amount.trin() === "" ||
            date.trin() === "") {
                throw new Error("Por favor, preeencha tdos os campos")
        }
    },

    formatValues() {

        let {description, amount, date} = Form.getValues()

        amount = Utils.formatAmount(amount)

        date = Utils.formatDate(date)

    },

    submit(event){
        event.preventDefault()

        try {
            //Form.validateFields()
            // formatar os dados para salvar 
            Form.formatValues()
            // salvar
            // apagar os dados do formulário
            // modal feche
            // atualizar a aplicação

        } catch (error) {
            alert(error.message)
        }

        
    }
}


const App = {
    init() {
        Transaction.all.forEach(transaction => {
            DOM.addTransaction(transaction)
        } )
        
        DOM.updateBalance()
    },

    reload() {
        DOM.clearTransacitons()
        App.init()
    },

}

App.init()
