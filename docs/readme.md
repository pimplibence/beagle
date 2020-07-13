## Getting Started

#### Install package

```bash
yarn add @kifly/beagle
```

#### Create an entry point

Create a class (application.ts), named as **Application**. This is an important thing, the application runner is looking for this name

```typescript
export class Application extends BaseApplication {
    protected providers: Provider[] = [];
    protected scripts: Scripts[] = [];
    
    protected configure(): Promise<void> {
        console.log('Hello World (Normal)');
    }

    protected configureHeadless(): Promise<void> {
        console.log('Hello World (Headless)');
    }

}
```

> You can run this application in two ways
>
> - **Normal Mode**
>   - Classic mode to run the Application, for example you can run an HTTP server on a specified port
>   - To use this mode, you have to override the **configure** method
>   - For more details, you can check [CLI Section](/cli)
>
> - **Headless Mode**
>   - Classic mode to run the Application, for example you can run an HTTP server on a specified port
>   - To use this mode, you have to override the **configure** method
>   - For more details, you can check [CLI Section](/cli)
