<script setup lang="ts">
const route = useRoute();
const status = route.params.status; // 決済が成功したかキャンセルされたか
const sessionId = route.query.session_id; // 決済のセッションID
</script>

<template>
  <div>
    <div class="hero min-h-[calc(100vh-160px)] md:min-h-[calc(100vh-96px)]">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <div v-if="status === 'success'">
            <div class="avatar mb-4">
              <div class="w-48 rounded-full bg-green-500">
                <div class="flex justify-center items-center h-48">
                  <span class="material-icons text-white text-9xl">check</span>
                </div>
              </div>
            </div>

            <h1 class="text-5xl font-bold text-green-500 mb-4">
              Order complete!
            </h1>

            <p class="mb-8 opacity-60 break-all">
              {{ `Order Session ID: ${sessionId}` }}
            </p>

            <NuxtLink to="/">
              <button class="btn btn-primary">Continue shopping</button>
            </NuxtLink>
          </div>

          <div v-else>
            <div class="avatar mb-4">
              <div class="w-48 rounded-full bg-yellow-500">
                <div class="flex justify-center items-center h-48">
                  <span class="material-icons text-white text-9xl">
                    clear
                  </span>
                </div>
              </div>
            </div>

            <h1 class="text-5xl font-bold text-yellow-500 mb-4">
              Order canceled...
            </h1>

            <p class="mb-8">
              If you want to keep checking out, go back to the cart.
            </p>

            <NuxtLink to="/cart">
              <button class="btn btn-primary">Back to cart</button>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
