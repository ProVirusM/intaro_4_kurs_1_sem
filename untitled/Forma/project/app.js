const App = {
    data(){
        return{
            placeholderString: "Введите название заметки",
            title: 'Список заметок',
            inputValue: '',
            notes: ['Заметка 1', 'Заметка 2'],
            profession: '',
            city: '',
            photo_url: '',
            full_name: '',
            phone: '',
            email: '',
            date_of_birth: '',
            education: '',
            desired_salary: '',
            key_skills: '',
            about_me: ''
        }
    },
    methods:{
        inputChangeHandler(){
            this.inputValue = event.target.value
        },
        inputChangeHandler2(){
            this.email = event.target.value2
        },
        addNewNote(){
            this.notes.push(this.inputValue)
            this.inputValue=''
        },
        // inputKeyPress(event){
        //     // console.log(event.key)
        //     if(event.key==='Enter'){
        //         this.addNewNote
        //     }
        // },
        removeNote(idx){
            this.notes.splice(idx, 1)
        }
    }
}
const app = Vue.createApp(App)
app.mount('#app')
