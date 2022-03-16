<template>
  <div class="container posts">
    <div class="posts__filter-wrap">
      <posts-filter
        placeholder="Filter by author..."
        v-model.trim="filter"
      />
    </div>
    <base-loader v-if="loading" />
    <template v-else>
      <div class="posts__no-result" v-if="!filteredPosts.length">No result</div>
      <div class="posts__cards">
        <post-card
          v-for="post in filteredPosts"
          :content="post" :key="post.id"
        />
      </div>
    </template>
  </div>
</template>

<script>
import { getPosts, getUsers } from "./api";
import PostCard from "./components/post-card";
import { ref, onMounted, computed } from 'vue'
import PostsFilter from "./components/posts-filter";
import BaseLoader from "./components/base-loader";
import capitalizeFirstLetter from "./helpers/capitalizeFirstLetter";
export default {
  name: 'App',
  components: { BaseLoader, PostsFilter, PostCard },

  setup() {
    let postsContent = ref(null);
    let authors = ref(null);
    let posts = ref([]);
    let filter = ref("");
    let loading = ref(true);

    onMounted(async () => {
      try {
        postsContent.value = await getPosts();
        authors.value = await getUsers();
        posts.value = await createPosts();
      } catch (err) {
        console.log(err);
      } finally {
        loading.value = false;
      }
    });

    const identifyAuthor = (id) => {
      return authors.value.find(author => author.id === id).name;
    }

    const createPosts = () => {
      return postsContent.value.map( post => {
        return {
          id: post.id,
          title: capitalizeFirstLetter(post.title),
          text: capitalizeFirstLetter(post.body),
          author: identifyAuthor(post.userId)
        }
      });
    }

    const filteredPosts = computed(() => {
      return posts.value.filter(post => {
        return post.author.toUpperCase().includes(filter.value.toUpperCase());
      });
    });

    return {
      filter,
      filteredPosts,
      loading
    }
  }
}
</script>

<style lang="scss">
@import '~normalize.css';

#app {
  background: #ECF1F6;
  min-height: 100vh;
}

.posts {
  margin: 0 auto;
  padding: 0 10px;

  &__filter-wrap {
    padding: 20px 0;
    display: flex;
    justify-content: center;
  }

  &__cards {
    padding: 10px 0 20px;
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    grid-gap: 20px;
    gap: 20px;
    align-items: start;

    @media (min-width: 640px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (min-width: 768px) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  &__no-result {
    text-align: center;
    font-size: 28px;
    line-height: 125%;
  }
}
</style>
