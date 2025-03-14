<template>
<div class="bg-white">
  <header class="absolute inset-x-0 top-0 z-50">
    <nav class="flex items-center justify-center p-6 lg:px-8" aria-label="Global">


      <div class="lg:flex lg:gap-x-12">
        <div class="mt-8 sm:mb-8 flex justify-center items-center">
        <div @click=get_another_tweet class="flex flex-row items-center relative rounded-full 
        px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-green-100 hover:ring-red-900/20
        ">
          <span class="animate-pulse  flex w-3 h-3 me-3 bg-green-500 rounded-full"></span>
          Bhaitards seeking wisdow: {{users_online}}
        </div>
      </div>
      </div>

    </nav>
      
  </header>

  <div class="relative isolate px-6 pt-14 lg:px-8 mt-4">
    <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
      <div class="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"></div>
    </div>
    <div class="mx-auto  py-8 sm:py-12 lg:py-14">
  

      <div class="sm:mb-8 flex justify-center items-center">
        <h1 class="text-5xl font-semibold tracking-tight text-balance text-gray-700 sm:text-7xl">The only advice you need!</h1>
  
      </div>


      <div class="mt-4 text-center flex flex-col justify-center items-center">
      
        <Tweet
    :tweet-url="random_tweet_url"
    
  >
  <template v-slot:loading>
    <span>
      Loading... Tweet is avoiding all pavements.
    </span>
  </template>
        </Tweet>

      </div>
      <div class="mt-8 sm:mb-8 flex justify-center items-center">
        <button @click=get_another_tweet class="bg-green-300 relative rounded-lg px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
          Get me another one!
        </button>
      </div>
           
    </div>

  </div>
</div>

</template>

<script setup>
import {ref,onMounted} from 'vue'
import Tweet from "vue-tweet";
import supabase from "../supabase"

let random_tweet_url = ref(null)
let users_online = ref(null)

onMounted(async ()=>{

  const { data, error } = await supabase
  .from('rtweets')
  .select('*').limit(1).single()
  random_tweet_url.value = data.URL


})

async function get_another_tweet() {
  const { data, error } = await supabase
  .from('rtweets')
  .select('*').limit(1).single()
  random_tweet_url.value = data.URL
}

const channel = supabase.channel('room1')
channel
  .on('presence', { event: 'sync' }, () => {
    users_online.value = Object.keys(channel.presenceState()).length
    
  })
  .subscribe(async (status) => {
    if (status === 'SUBSCRIBED') {
      await channel.track({ online_at: new Date().toISOString() })
    }
  })



</script>