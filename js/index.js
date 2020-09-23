    var app = new Vue({
          el:"#root",
          data:{
              city:'',
              List:[],
              HotList:[]   
          },       
          methods:{
            searchWeather:function(){
                var that = this;
                axios.get('http://wthrcdn.etouch.cn/weather_mini?city='+this.city)
                .then(function(response){
                    console.log(response.data.data)
                    that.List = response.data.data.forecast;
                })
                .catch(function(err){})
            },
            hotcity:function(string){
                var that = this;
                axios.get('http://wthrcdn.etouch.cn/weather_mini?city='+string)
                .then(function(response){
                    console.log(response.data.data)
                    that.List = response.data.data.forecast;
                })
                .catch(function(err){})
            }

          }
      })