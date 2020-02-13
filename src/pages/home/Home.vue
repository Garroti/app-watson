<template>
    <div>
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand>
            <router-link to="/">TICKETS</router-link>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
            <b-nav-item to="/chatbot">Registrar um ticket</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
            <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" v-model="filter" placeholder="Pesquiser ticket"></b-form-input>
            <b-button size="sm" @click="filterTickets" class="my-2 my-sm-0">Pesquisar</b-button>
            </b-nav-form>

            <b-nav-item-dropdown right>
                <template v-slot:button-content>
                    <em>{{ name }}</em>
                </template>
                <b-dropdown-item @click="logout">Sair</b-dropdown-item>
            </b-nav-item-dropdown>
        </b-navbar-nav>
        </b-collapse>
      </b-navbar>
      <div>
        <b-list-group v-for="ticket in tickets" v-bind:key="ticket.id">
          <b-list-group-item>{{ ticket.id }} - {{ ticket.description }}</b-list-group-item>
        </b-list-group>
      </div>
    </div>
</template>

<script>

export default {
  name: 'Home',
  data () {
    return {
      usuario: false,
      userid: null,
      name: '',
      mail: '',
      tickets: [],
      filter: ''
    }
  },
  created(){
    let usuarioAux = this.$store.getters.getUsuario;
    if(usuarioAux){
      this.usuario = this.$store.getters.getUsuario;
      this.userid = this.usuario.id;
      this.name = this.usuario.name;
      this.mail = this.usuario.mail;
    }
  },
  methods: {
    allTickets() {
      this.axios.get('api/tickets', {"headers": {"authorization":"Bearer " + this.$store.getters.getToken}}).then((response) => {
        this.tickets = response.data
      })
    },
    filterTickets() {
      this.axios.get(`api/tickets/${this.userid}/${this.filter}`, {"headers": {"authorization":"Bearer " + this.$store.getters.getToken}}).then((response) => {
        this.tickets = response.data
      })
    },
    logout() {
      sessionStorage.clear();
      this.$router.push('/login');
    }
  },
  watch: {
    filter: function() {
      if (this.filter == '') {
        this.allTickets()
      }
    }
  },
  mounted() {
    this.allTickets()
  }
}
</script>

<style scoped>

</style>