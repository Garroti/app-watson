<template>
  <div>
    <div class="chat">
        <header>Chatbot - <b-nav-item to="/">Volta para home</b-nav-item></header>
        <main>
            <section>
                <div class="message" v-for="m in messages"  v-bind:key="m.id" :class="{ me: m.me }" v-html="$options.filters.messageFormat(m.text)"></div>
                <img src="../../assets/35.gif" v-if="loading" style="width: 50px"/>
                <textarea :disabled="loading" placeholder="Envie uma mensagem..." @keypress.enter.prevent="sendMessage" v-model="message"></textarea>
            </section>
        </main>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Chatbot',
   data() {
        return {
            context: {},
            messages: [],
            message: null,
            loading: false,
            id: `${Date.now()}`,
            user_id: this.$store.getters.getUsuario.id
        }
    },
    methods: {
        returnId() {
            return `${Date.now()}`
        },
        sendMessage() {
            if(this.message != null) {
                this.messages.push({
                    id: this.returnId(),
                    me: true,
                    text: this.message
                })
            }
            const data = {
                message: this.message,
                context: this.context,
                user_id: this.user_id
            }
            this.message = '';
            this.loading = true;
            this.axios.post('api/dialog', data, {"headers": {"authorization":"Bearer " + this.$store.getters.getToken}}).then((response) => {
                this.messages.push({
                    id: this.returnId(),
                    me: false,
                    text: response.data.response.result.output.text
                })
                this.context = response.data.response.result.context
                this.loading = false;
            })
        }
    },
    filters: {
        messageFormat (text) {
            if (typeof text == 'string') {
                return text;
            }

            if (typeof text == 'object') {
                let result = '';
                for (let i = 0; text.length > i; i++) {
                    result += `<p>${text[i]}</p>`
                }
                return result;
            }
        }
    },
    mounted() {
        this.sendMessage()
    }
}
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Lato');
    .chat * {
        margin: 0;
        border: 0;
        padding: 0;
        font: inherit;
    }
    .chat {
        font-family: 'Lato', sans-serif;
        font-size: 16px;
    }
    .chat header {
        font-weight: bold;
        padding: 10px 20px;
        background-color: #e67e22;
        color: white;
    }
    .chat section {
        padding: 10px 20px;
        background-color: #f1c40f;
        color: white;
        display: flex;
        flex-direction: column;
    }

    .chat section * {
        border-radius: 10px;
    }

    .chat section .message {
        padding: 10px;
        border-left: 3px solid #f39c12;
        background-color: rgba(255, 255, 255, 0.7);
        color: #f39c12;
        margin-bottom: 5px;
        width: 80%;
    }

    .chat section .message.me {
        padding: 20px;
        border: none;
        border-bottom: 3px solid #e67e22;
        border-top: 3px solid #e67e22;
        background: #f39c12;
        color: white;
        align-self: flex-end;
    }

    .chat section .message p {
        padding-bottom: 10px;
    }

    .chat textarea {
        padding: 20px;
        border: 2px solid #f1c40f;
    }

    .chat textarea:focus {
        outline: none;
        border: 2px solid #f39c12;
    }
</style>