const obj = {
  created() {
    this.$store.commit("hide");
  },
  destroyed() {
    this.$store.commit("show");
  },
};

export default obj;
