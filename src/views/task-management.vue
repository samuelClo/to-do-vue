<template>
  <div class="about">
    <main>
      <div v-on:click="disconnect" class="disconnect">
        <span>Se déconnecter</span>
      </div>
      <h1 id="title">to do list</h1>
<!--      <button v-tooltip="You have new messages">-->
      <div v-if="isConnected">
        <div id="addTaskContain">
          <input
            placeholder="new task"
            type="text"
            class="addTask  mr-2"
            v-on:keyup.enter="createArticle(valueInput)"
            v-model="valueInput"
          >
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded outline-none"
            v-on:click="createArticle(valueInput)"
          >
            Submit
          </button>
        </div>


        <input placeholder="filter" class="w-full addTask" type="text" v-model="searchContent">
        <div id="containAlltask" class="relative">
<!--          <i v-on:click="renderTaskOption" class="fas fa-ellipsis-v text-blue-500"></i>-->
          <div id="taskOptionPanel">
            <i
              v-on:click="selectAll(true)"
              class="fas fa-check-double"
            ></i>
            <img  v-on:click="selectAll(false)" src="https://img.icons8.com/metro/26/000000/uncheck-all.png">
            <i
              v-on:click="deleteAll"
              class="far fa-trash-alt"
            />
          </div>
          <ul>
            <li v-for="(content, index) in filteredTas">
              <div>
                <div
                  class="checkbox"
                  v-bind:class="{ checkboxFill: content.done }"
                  v-on:click="doneArticle(index)"
                ></div>
              </div>

              <span
                v-bind:class="{ lineThrough: content.done }"
                v-on:dblclick="editArticle(index)"
                v-if="!content.isEditabled"
              >
                {{content.content }}
              </span>
              <input
                v-on:keyup.escape="replacePrevText(index)"
                v-on:keyup.enter="editArticle(index)"
                v-model="content.content"
                class="inputModify"
                autofocus
                v-else
                type="text"
              >
              <i
                v-if="!content.isEditabled"
                v-on:click="deleteArticle(index, $event)"
                class="far fa-trash-alt"
              />
              <i v-else v-on:click="editArticle(index)" class="fas fa-edit"></i>
            </li>
          </ul>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
    let watchExecuting = false
    export default {
        mounted() {
            if (this.$fbAuth()) {
                this.isConnected = true
                this.getDataFromDb()
            }
        },
        data() {
            return {
                valueInput: null,
                searchContent: null,
                isConnected: false,
                tasks: []
            }
        },
        computed: {
            filteredTas() {
                if (this.searchContent != null)
                    return this.tasks.filter(el => el.content.toLowerCase().includes(this.searchContent.toLowerCase()))
                else
                    return this.tasks
            }
        },
        watch: {
            tasks: {
                deep: true,
                handler() {
                    this.pushDataOnDb()
                }
            }
        },
        methods: {
            selectAll(type) {
                this.tasks.forEach(el => el.done = type)
            },
            deleteAll() {
                this.tasks = []
            },
            createArticle(value) {
                if (!value || !value.trim())
                    return

                this.tasks.unshift({
                    content: value,
                    beforeEditabled: '',
                    done: false,
                    isEditabled: false,
                })
                this.valueInput = null
            },
            deleteArticle(index, e) {
                e.stopPropagation()
                this.tasks.splice(index, 1)
            },
            doneArticle(index) {
                this.tasks[index].done = !this.tasks[index].done
            },
            editArticle(index) {
                if (!this.tasks[index].isEditabled)
                    this.tasks[index].beforeEditabled = this.tasks[index].content
                else if (!this.tasks[index].content || !this.tasks[index].content.trim())
                    this.tasks[index].content = this.tasks[index].beforeEditabled

                this.tasks[index].isEditabled = !this.tasks[index].isEditabled
            },
            replacePrevText(index) {
                this.tasks[index].content = this.tasks[index].beforeEditabled
                this.tasks[index].isEditabled = !this.tasks[index].isEditabled
            },
            getDataFromDb() {
                if (!this.$fbAuth().currentUser)
                    return null

                const docRef = this.$fbDb().collection("tasks").doc(this.$fbAuth().currentUser.uid);

                docRef.get()
                    .then(doc => {
                        if (doc.data() === this.tasks)
                            return null
                        this.tasks = Object.values(doc.data())
                    })
                    .catch(function (error) {
                        console.error("Error getting document: ", error);
                    });
            },
            pushDataOnDb() {
                const docRef = this.$fbDb().collection("tasks").doc(this.$fbAuth().currentUser.uid);

                if (!watchExecuting) {
                    watchExecuting = true
                    return
                }

                docRef.set({...this.tasks})
                    .then(function () {
                        console.log("Document successfully written!");
                    })
                    .catch(function (error) {
                        console.error("Error writing document: ", error);
                    });
            },
            disconnect() {
                this.$fbAuth().signOut()
                this.$router.replace('/connect')
            }
        },
    }
    // Initialize
    var Tooltips = document.getElementsByClassName('TooltipTrigger');

    // Track all tooltips trigger
    for (var i = 0; i < Tooltips.length; i++) {

        // Event Handler
        Tooltips[i].addEventListener("mouseenter", function(ev) {
            ev.preventDefault();
            this.style.position = "relative";
            this.innerHTML = this.innerHTML + "<div class='Tooltips'><p class='" + this.getAttribute("data-position") + "'>" + this.getAttribute("data-tooltips") + "</p></div>";
        });
        Tooltips[i].addEventListener("mouseleave", function(ev) {
            ev.preventDefault();
            this.removeAttribute("style");
            this.innerHTML = this.innerHTML.replace(/<div[^]*?<\/div>/, '');;
        });

    }
</script>
<style scoped lang="scss">
  $borderInput: 1px;
  $iconSize: 20px;

  @mixin icon-size {
    height: $iconSize;
    width: $iconSize;
    font-size: $iconSize;
  }

  #taskOptionPanel {
    display: flex;
    padding: 3px 0;
    justify-content: space-between;
    margin-top: 20px;

    * {
      cursor: pointer;
      @include icon-size;
    }
    .fa-check-double {
     color: #4e82bd;
      &:hover &::after {
        content: 'ehhehe';
        color: red;
      }
    }
  }

  .fa-ellipsis-v {
    position: absolute;
    top: 0;
    @include icon-size;
    right: -20px;
  }

  .checkbox {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    padding: 5px;
    border: 1px solid #4e82bd;
    background-clip: content-box;
  }

  .lineThrough {
    text-decoration: line-through;
  }

  .checkboxFill {
    background-color: #4e82bd;
  }

  .connectWithGoogle {
    height: 30px;
  }

  .about {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  ul {
    margin-top: 50px;
    list-style: none;
    background-color: #fcfcfc;
  }

  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    padding: 5px 20px;
    cursor: pointer;
    max-width: 461px;

    span {
      padding: 0 10px;
      text-align: center;
    }
  }

  h1 {
    text-align: center;
    margin-top: 5vh;
    margin-bottom: 10vh;
    text-decoration: underline lightskyblue;
  }

  input[type='text'] {
    background-color: unset;
    border: unset;
    border-bottom: $borderInput solid lightslategrey;
  }

  .addTask {
    padding: 3px 5px;
  }

  input[type='submit'] {
    border: unset;
    background-color: lightskyblue;
    padding: 6px 5px;
    color: #ffffff;
    border-radius: 3px;
    margin-left: 10px;
    cursor: pointer;
  }

  .disconnect {
    color: white;
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 16px;
    cursor: pointer;
    background-color: #cd3953;
    padding: 5px 10px;
    border-radius: 5px;
  }

  .inputModify {
    width: 100px;
    font-size: inherit;
    margin-bottom: $borderInput / -1;
  }

  .fa-edit {
    color: #82dc82;
  }

  .fa-trash-alt {
    color: #ff6461;
  }
  @media screen and (max-width: 400px) {
    #title {
      margin-top: 3rem;
      margin-bottom: 1rem;
    }
    .disconnect {
      top: 5px;
      right: 5px;
    }
    #addTaskContain {
      display: flex;
      flex-direction: column;
      button {
        margin: 10px 0 15px 0;
      }
    }
  }
</style>


