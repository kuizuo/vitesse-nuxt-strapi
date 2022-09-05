<script setup lang="ts">
const { authenticateProvider } = useStrapiAuth()
const route = useRoute()
console.log(route.query.access_token)
const response = await authenticateProvider('github', route.query.access_token)
console.log(response)
</script>
