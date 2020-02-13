<template>
  <div>
      <b-form-input type="text" v-model="name" placeholder="Digite nome"></b-form-input>
        <b-form-input type="text" v-model="mail" placeholder="Digite um email"></b-form-input>
        <b-form-input type="password" v-model="password" placeholder="Digite uma Senha"></b-form-input>
        <b-button
            @click="cadastro" 
            variant="success">
            Cadastrar
        </b-button>
        <br>
        <b-navbar-brand>
            Ja tem cadastro?<router-link to="/login">Entre aqui</router-link>
        </b-navbar-brand>
  </div>
</template>

<script>

export default {
  name: 'Cadastro',
  data () {
    return {
        name: '',
        mail: '',
        password: ''
    }
  },
  methods: {
    cadastro(){
        this.axios.post('auth/signup', {
            name: this.name,
            mail: this.mail,
            password: this.password,
        })
        .then(res => {
            if(res.data.token){
                this.$store.commit('setUsuario', res.data.status)
                sessionStorage.setItem('usuario', JSON.stringify(res.data.usuario));
                this.$router.push('/');
            } else {
                alert('Erro no cadastro !!!');
            }
        })
        .catch(e => {
            console.log(e)
            alert('Erro! Tente novamente mais tarde')
        })
    }
  }
}
</script>

<style scoped>

</style>