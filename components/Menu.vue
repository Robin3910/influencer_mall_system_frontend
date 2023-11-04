<script lang="jsx">
import {useMenu} from "~/composables/states";

export default defineComponent({
  props: ['direction'],
  emits: ['change', 'submit'],
  setup: (props,ctx) => {

    const menuData = useMenu()
    const route=useRoute()
    const handlerMenuChange = (item) => {
      if(item.url) {
        window.open(item.url, "_blank");

        // window.location.href = item.url;
      }
      menuData.value.forEach((v) => {
        v.active = false
      })
      item.active = true
      ctx.emit('change')
    }

    function createMenu(data, className) {
      if (Array.isArray(data) && data.length > 0) {
        return (<ul class={className}>
          {
            data.map((item) => {
              // if (item.children && item.children.length > 0) {
              //   return (
              //       <a href="#" onClick={handlerMenuChange.bind(this, item)}>
              //         <li class="menu-children-wrap" class={[item.active ? "" : ""]}>
              //           <span>{item.title}</span>
              //           {createMenu(item.children, ['sub-memu-wrap'])}
              //         </li>
              //       </a>
              //   )
              // }
              // if (className.includes("sub-memu-wrap")) {
              //   return (
              //       <a href="#">
              //         <li>{item.title}</li>
              //       </a>)
              // }
              return (
                  <NuxtLink to={item.path} onClick={handlerMenuChange.bind(this, item)}>
                    <li className={[route.path==item.path ? "active" : ""]}>
                      {item.title}
                    </li>
                  </NuxtLink>
              )
            })
          }
        </ul>)
      }
    }

    return () => (
        <div class={props.direction}>{createMenu(menuData.value, ['menu-wrap', 'flex', 'items-center'])}</div>)
  }
})
</script>
<style lang="less">
.horizontal {
  .active {
    color: #000!important;
    &:before {
      position: absolute;
      bottom: 10px;
      left: 50%;
      width: 20%;
      height: 3px;
      content: " ";
      background: var(--color-primary);
      transform: translateX(-50%);
    }
  }

  .menu-wrap {
  @apply pl-6 pr-6;

    li {
      position: relative;
      line-height: 60px;
    @apply pl-6 pr-6;
      color: #666;

      &:hover {
        background-color: rgba(102, 102, 102, 0.05);
      }
    }

    .menu-children-wrap {
      position: relative;

      .sub-memu-wrap {
        position: absolute;
        top: 100%;
        left: 0;
        margin-top: 10px;

        background: white;

        li {
          border-bottom: 1px solid rgba(220, 220, 220, 0.5);
          width: 180px;

          &:last-of-type {
            border-bottom: none;
          }
        }
      }
    }
  }
}

.vertical {
  .active {
    &:before {
      position: absolute;
      top: 50%;
      right: 0;
      width: 3px;
      height: 30%;
      content: " ";
      background: var(--color-primary);
      transform: translateY(-50%);
    }
  }

  .menu-wrap {
    a {
      width: 100%;
    }
  }

  .menu-wrap {

  @apply flex-col;

    li {
      width: 100%;
      position: relative;
      line-height: 60px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    @apply pl-6 pr-6;
      color: #666;

      &:hover {
        background-color: rgba(102, 102, 102, 0.05);
      }
    }

    .menu-children-wrap {
      position: relative;

      .sub-memu-wrap {
        position: absolute;
        top: 100%;
        left: 0;
        margin-top: 10px;

        background: white;

        li {
          border-bottom: 1px solid rgba(220, 220, 220, 0.5);
          width: 180px;

          &:last-of-type {
            border-bottom: none;
          }
        }
      }
    }
  }
}

</style>