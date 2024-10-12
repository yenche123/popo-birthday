import { createApp } from 'vue'
import './styles/styles.css'
import App from './App.vue'
import { router } from './routes/router'

const app = createApp(App)

app.use(router)
app.mount('#app')
