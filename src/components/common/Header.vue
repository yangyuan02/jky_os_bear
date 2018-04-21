<template>
  <Header>
    省级政府履行教育职责测评系统-{{this.planName}}
  </Header>
</template>

<script>
export default {
    data(){
        return{
            planName:window.localStorage.getItem("planName"),
        }
    }
}
</script>

<style>

  Header{
    height: 100%;
    width: 100%;
    color: #fff;
    font-size: 18px;
    display: flex;
    align-items: center;
  }

</style>


