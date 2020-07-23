### Install CLI

You can run a beagle application with its own application-runner, **kifly-beagle**

```bash
$ yarn global add @kilfy/beagle
```

After installation, you can use the following command

```bash
$ kifly-beagle <command> <options>
```

To learn more information about commands, you can use

```bash
$ kifly-beagle --help
```

> **NOTE**
>
> If you want to use application these commands without global installation, you can use it as executable at path **./node_modules/@kifly/beagle/bin/bin.js**

The cli presents a way to configure your application runtime. You can make a config file to define runtime behavior

> **NOTE**
>
> This config file will be loaded with a **require** function, so you can use commonjs-compatible modules
>
> Recommendations:
> - config.json
> - config.js

The default config file is **config.json**
