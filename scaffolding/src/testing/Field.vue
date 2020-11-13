<template>
    <div>
        <mt-field type="text" label="用户名" placeholder="请输入用户名" state="error"
        :attr="{maxlength:12}" v-model="username"></mt-field>
        <mt-field type="text" label="密码" placeholder="请输入密码" state="success"
        :attr="{maxlength:12}" v-model="password"></mt-field>
         <mt-field type="text" label="密码" placeholder="请确认密码" state="success"
         :attr="{maxlength:12}" v-model="conpassword"></mt-field>
        <mt-button type="primary" size="large" @click="handle">免费注册</mt-button>
    </div>
</template>
<script>
export default {
    data(){
        return{
            username:'',
            password:'',
            conpassword:''
        }
    },
    methods:{
        handle(){
           let username=this.username;
           let password=this.password;
           let conpassword=this.conpassword;
           let usernameReg=/^[0-9a-zA-Z]{6,12}$/;
           if(usernameReg.test(username)){
               console.log("可以使用");
           }else{
               this.$toast("用户名格式或内容错误");
               return;
           }
           let passwordReg=/^[0-9A-Za-z\.\-_]{8,15}$/;
           if(passwordReg.test(password)){
               console.log("密码可以使用");
           }else{
               this.$toast({
                   message:"密码错误",
                   position:"middle",
                   duration:5000
               })
               return;
           }
           if(password==conpassword){
               console.log("两次密码一致");
           }else{
               this.$toast({
                   message:"两次密码不一致",
                   position:"middle",
                   duration:5000
               });
               return false;
           }
        }

    }
}
</script>