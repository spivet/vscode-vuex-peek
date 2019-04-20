## Functionality

This extension extends Vue code editing with `Go To Definition` and `Peek Definition` support. It helps us quickly jump to or peek the file where the vuex property defined from a `.vue` component.

![使用示例](images/example.gif)

You can also use `Ctrl + click` to jump to the postion where the vuex property defined.

## How to use

Whene we reference the vuex property in our `.vue` components, it's not a regular uri. So we must follow some rules for parsing the path. This includes:

1. Put all your `store` files in `store` folder, if you only use a `store.js`, it won't be useful.

2. You need to separate `store` to different files, like this:

![文件划分](images/dir.png)

3. You need to add prefix for alias when you use in `.vue` components:

    ```JavaScript
    // Add `vxs` for State alias
    ...mapState({
        vxsAccountInfo: state => state.account.accountInfo
    })
    // Add `vxg` for Getters alias
    ...mapGetters({
        vxgDoneCount: 'doneCount'
    })
    // Add `vxa` for Actions alias
    ...mapActions({
        vxaGetStudent: 'student/getStudent'
    })
    // Add `vxm` for Mutations alias
    ...mapMutations({
        vxmSetStudent: 'student/setStudent'
    })
    ```

4. Configure the path of `store` folder in `settings.json`, like this:

    ```JSON
    {
      ...
      "vuex_peek.storePath": [
        "src/entries/manager",
        "src/entries/teacher",
        "src/entries/student"
      ]
    }
    ```

## Release Notes

### 0.7.0

* Add instructions

### 0.6.0

* Initial release
