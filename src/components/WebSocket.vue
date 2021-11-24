<template>
  <div></div>
</template>

<script>
import { reactive, toRefs, ref } from "vue";
import { io } from "socket.io-client";
import { onMounted, onUpdated, onBeforeUnmount } from "vue";

export default {
  name: "WebSocket",
  setup() {
    let socket = null;
    const message = ref([]);
    onMounted(() => {
      socket = io("ws://192.168.1.199:8080/websocket");
      //   建立连接事件
      socket.on("connect", () => console.log("connect: websocket 连接成功！"));
      // 关闭连接的事件
      socket.on("disconnect", () =>
        console.log("disconnect: websocket 连接关闭！")
      );
      //   接收消息事件
      socket.on("message", (msg) => {
        message.value = msg;
      });
      //   发送消息事件
      socket.emit("send", message);
    });
    onBeforeUnmount(() => {
      // 关闭连接
      socket.close();
      // 销毁 websocket 实例对象
      socket = null;
    });
  },
};
</script>

<style>
</style>