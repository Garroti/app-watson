<template>
  <div>
    <b-form-input type="text" v-model="mail" placeholder="Digite seu email"></b-form-input>
    <b-form-input type="password" v-model="password" placeholder="Digite sua Senha"></b-form-input>
    <b-button
      @click="login" 
      variant="success">
      Entrar
    </b-button>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data () {
    return {
      mail: '',
      password: ''
    }
  },
  methods: {
    login(){
      this.axios.post('auth/signin', {
        mail: this.mail,
        password: this.password
      })
      .then(res => {
        if(res.data.token){
          this.$store.commit('setUsuario', res.data)
          sessionStorage.setItem('usuario', JSON.stringify(res.data));
          this.$router.push('/');
        }  else {
          alert('Erro! Login ou senha incorretos')
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