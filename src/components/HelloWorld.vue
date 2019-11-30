<template>
  <div class="about">
    <h1>to do list</h1>
    <input v-on:keyup.enter="createArticle(valueInput)" v-model="valueInput" type="text">
    <input v-on:click="createArticle(valueInput)" type="submit">
    <div id="containAlltask">
      <ul>
        <li v-for="(content, index) in tasks" v-on:dblclick="editArticle(index)" >
          <div
              v-on:click="doneArticle(index)"
              class="checkbox"
              v-bind:class="{ checkboxFill: content.done }"
          ></div>
          <span v-if="!content.isEditabled">
            {{content.content }}
          </span>
          <input
              v-on:keyup.escape="replacePrevText(index)"
              v-on:keyup.enter="editArticle(index)"
              v-model="content.content"
              v-focus
              v-else
              type="text"
          >
          <i v-if="!content.isEditabled" v-on:click="deleteArticle(index)" class="far fa-trash-alt"></i>

          <i v-else v-on:click="editArticle(index)" class="fas fa-edit"></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                valueInput: null,
                tasks: [
                    {
                        content: 'test',
                        beforeEditabled: '',
                        done: false,
                        isEditabled: false,
                    },
                    {
                        content: 'test2',
                        beforeEditabled: '',
                        done: false,
                        isEditabled: false,
                    },
                    {
                        content: 'test3',
                        beforeEditabled: '',
                        done: false,
                        isEditabled: false,
                    },
                ]
            }
        }, methods: {
            createArticle(value) {
                if (!value)
                    return
                this.tasks.unshift({
                    content: value,
                    beforeEditabled: '',
                    done: false,
                    isEditabled: false,
                })
                this.valueInput = null
            },
            deleteArticle(index) {
                this.tasks.splice(index, 1)
            },
            doneArticle(index) {
                this.tasks[index].done = !this.tasks[index].done
            },
            editArticle(index) {
                if (!this.tasks[index].isEditabled)
                    this.replacePrevText(index)
                else if (!this.tasks[index].content)
                    this.tasks[index].content = this.tasks[index].beforeEditabled

                this.tasks[index].isEditabled = !this.tasks[index].isEditabled
            },
            replacePrevText(index){
                this.tasks[index].beforeEditabled = this.tasks[index].content
            },
        }
    }
</script>
<style scoped lang="scss">
  .checkbox {
    height: 15px;
    width: 15px;
    border-radius: 50%;
    padding: 5px;
    border: 1px solid black;
    background-clip: content-box;
  }

  .checkboxFill {
    background-color: black;
  }

  .fa-edit{
    color: lightgreen;
  }

  .fa-trash-alt{
    color: #ff443f;
  }
</style>
