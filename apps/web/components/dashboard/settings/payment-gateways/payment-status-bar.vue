<template>
  <div>
    <Teleport to="body">
      <footer
        class="fixed bottom-0 start-0 w-screen h-8 bg-black border-t border-border-default px-6 flex items-center justify-between z-40 overflow-hidden lg:start-64 lg:w-[calc(100vw-16rem)]">
        <div class="flex items-center gap-6">
          <div class="flex items-center gap-2">
            <div class="w-1.5 h-1.5 rounded-full bg-success"></div>
            <span class="text-[9px] font-bold text-success/80 tracking-widest">Gateway_Sync: {{
              systemStats.sync }}</span>
          </div>
          <span class="text-[9px] font-bold text-tx-muted tracking-widest">Latency: {{ systemStats.latency
          }}</span>
        </div>
        <div class="flex items-center gap-6">
          <span class="text-[9px] font-bold text-tx-muted tracking-widest">Region: {{ systemStats.region
          }}</span>
          <span class="text-[9px] font-black text-brand/60 tracking-widest">OS_Version: {{
            systemStats.version }}</span>
        </div>
      </footer>
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
const systemStats = {
  sync: "OK",
  latency: "42ms",
  region: "US-EAST-1",
  version: "2.4.0-STABLE",
};
</script>