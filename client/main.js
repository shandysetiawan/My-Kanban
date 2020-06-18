new Vue({
    el: "#app",
    data: {
        emailRegister: "",
        passwordRegister: "",
        emailLogin: "",
        passwordLogin: "",
        isLogged: false,
        tasks: [],
        titleTask: "",
        descriptionTask: "",
        categoryTask: "",
        showModal: false
    },
    created() {

        if (localStorage.token) {
            this.isLogged = true
            this.fetchTask()
        }



    },
    mounted() {

    },
    watch: {
        titleTask(newVal, oldVal){
            console.log()
        }
    },
    computed: {
        getBacklog() {
            const backlog = []
            this.tasks.forEach(element => {
                if (element.category == "backlog") {
                    backlog.push(element)
                }
            });
            return backlog
        },
        getDone() {
            const done = []
            this.tasks.forEach(element => {
                if (element.category == "done") {
                    done.push(element)
                }
            });
            return done
        },
        getCompleted() {
            const completed = []
            this.tasks.forEach(element => {
                if (element.category == "completed") {
                    completed.push(element)
                }
            });
            return completed
        },
        getTodo() {
            const todo = []
            this.tasks.forEach(element => {
                if (element.category == "todo") {
                    todo.push(element)
                }
            });
            return todo
        }

    },
    methods: {
        loginUser() {

            axios.post('http://localhost:3000/login', {
                email: this.emailLogin,
                password: this.passwordLogin
            })
                .then(response => {
                    // console.log(response.data);
                    // console.log('can logged?')
                    this.isLogged = true

                    localStorage.setItem('token', response.data)

                    this.emailLogin = ""
                    this.passwordLogin = ""
                    this.fetchTask()

                })
                .catch(error => {
                    // console.log(error.response.data.message);
                })

        },
        registerUser() {

            axios.post('http://localhost:3000/register', {
                email: this.emailRegister,
                password: this.passwordRegister

            })
                .then(response => {
                    console.log(response.data);
                    this.emailRegister = ""
                    this.passwordRegister = ""
                })
                .catch(error => {
                    // console.log(error.response.data.message);
                })

        },
        fetchTask() {

            axios({
                method: 'get',
                url: 'http://localhost:3000/task',
                headers: { access_token: localStorage.token }

            })
                .then(response => {
                    // console.log(response.data.data);
                    this.tasks = response.data.data

                })
                .catch(error => {
                    // console.log(error.response.data.message);
                })

        },
        addTask() {

            axios({
                method: 'post',
                url: 'http://localhost:3000/task',
                data: {
                    title: this.titleTask,
                    category: this.categoryTask,
                    description: this.descriptionTask,
                },
                headers: { access_token: localStorage.token }
            })
                .then(response => {
                    console.log(response.data);
                    let dataTask = { id: response.data.id, title: response.data.title, category: response.data.category }
                    this.task.push(dataTask)
                    this.titleTask = ""
                    this.descriptionTask = ""
                    this.categoryTask = ""
                })
                .catch(error => {
                    // console.log(error.response.data.message);
                    console.log(error.response)
                })


        },
        removeTask(id) {

            axios({
                method: 'delete',
                url: `http://localhost:3000/task/${id}`,
                headers: { access_token: localStorage.token }
            })
                .then(response => {
                    console.log(response.data);
                    this.fetchTask()

                })
                .catch(error => {
                    // console.log(error.response.data.message);
                    console.log(error.response)
                })
        },
        editTask() {

            axios({
                method: 'post',
                url: 'http://localhost:3000/task',
                data: {
                    title: this.titleTask,
                    category: this.categoryTask,
                    description: this.descriptionTask,
                },
                headers: { access_token: localStorage.token }
            })
                .then(response => {
                    console.log(response.data);
                    this.titleTask = ""
                    this.descriptionTask = ""
                    this.categoryTask = ""
                })
                .catch(error => {
                    // console.log(error.response.data.message);
                    console.log(error.response)
                })


        }

    }

})