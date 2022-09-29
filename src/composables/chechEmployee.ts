import { ref } from 'vue'
import {useRouter} from 'vue-router'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'

export function checkEmployee() {
  const userStore = useUserStore()
  const router = useRouter()

  const isEmployee = storeToRefs(userStore)
  const x = ref(0)
  const y = ref(0)

  function update(event) {
    x.value = event.pageX
    y.value = event.pageY
  }

  // expose managed state as return value
  return { x, y }
}
