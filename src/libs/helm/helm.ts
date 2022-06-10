import { Command } from './libs/command';

export interface HelmOptions {
    executable?: string;
    kubeApiServer?: string;
    kubeAsGroup?: string[];
    kubeAsUser?: string;
    kubeCaFile?: string;
    kubeContext?: string;
    kubeToken?: string;
    kubeConfig?: string;
    namespace?: string;
    registryConfig?: string;
    repositoryCache?: string;
}

export interface CreateOptions {
    name: string;
    starter?: string;
}

export interface DependencyBuildOptions {
    chart: string;
    keyring?: string;
    skipRefresh?: boolean;
    verify?: boolean;
}

export interface DependencyListOptions {
    chart: string;
}

export interface DependencyUpdateOptions {
    chart: string;
    keyring?: string;
    skipRefresh?: boolean;
    verify?: boolean;
}

export interface GetAllOptions {
    name: string;
}

export interface GetHooksOptions {
    name: string;
    revision?: number;
}

export interface GetNotesOptions {
    name: string;
    revision?: number;
}

export interface GetManifestOptions {
    name: string;
    revision?: number;
}

export interface GetValuesOptions {
    name: string;
    all?: boolean;
    revision?: number;
}

export interface HistoryOptions {
    name: string;
    max?: number;
}

export interface InstallOptions {
    atomic?: boolean;
    caFile?: string;
    certFile?: string;
    createNamespace?: boolean;
    dependencyUpdate?: boolean;
    description?: string;
    disableOpenapiValidation?: boolean;
    dryRun?: boolean;
    generateName?: boolean;
    insecureSkipTlsVerify?: boolean;
    keyFile?: string;
    keyring?: string;
    nameTemplate?: string;
    noHooks?: boolean;
    passCredentials?: string;
    password?: string;
    postRenderer?: string;
    postRendererArgs?: string[];
    renderSubchartNotes?: string;
    replace?: boolean;
    repo?: string;
    set?: string[];
    setFile?: string[];
    setString?: string[];
    skipCrds?: boolean;
    duration?: number;
    username?: string;
    values?: string[];
    verify?: boolean;
    version?: string;
    wait?: boolean;
    waitForJobs?: boolean;
}

export interface ListOptions {
    all?: boolean;
    allNamesapces?: boolean;
    date?: boolean;
    deployed?: boolean;
    failed?: boolean;
    filter?: string;
    max?: number;
    offset?: number;
    pending?: boolean;
    reverse?: boolean;
    selector?: string;
    superseded?: boolean;
    timeFormat?: string;
    uninstalled?: boolean;
    uninstalling?: boolean;
}

export interface PackageOptions {
    chartPath: string;
    dependencyUpdate?: boolean;
    destination?: string;
    key?: string;
    keyring?: string;
    passphraseFile?: string;
    sign?: boolean;
}

export interface PluginInstallOptions {
    urlOrPath: string;
    version?: string;
}

export interface PluginListOptions {
    //
}

export interface PluginUninstallOptions {
    plugin: string;
}

export interface PluginUpdateOptions {
    plugin: string;
}

export interface PullOptions {
    chartUrl: string;
    caFile?: string;
    certFile?: string;
    destination?: string;
    insecureSkipTlsVerify?: boolean;
    keyFile?: string;
    keyring?: string;
    passphraseCredentials?: string;
    password?: string;
    prov?: boolean;
    repo?: string;
    untar?: boolean;
    untardir?: string;
    username?: string;
    verify?: boolean;
    version?: string;
}

export interface PushOptions {
    chart: string;
    remote: string;
}

export interface RegistryLoginOptions {
    host: string;
    insecure?: boolean;
    password?: string;
    username?: string;
}

export interface RegistryLogoutOptions {
    host: string;
}

export interface RepoAddOptions {
    name: string;
    url: string;
    allowDeprecatedRepos?: boolean;
    caFile?: string;
    certFile?: string;
    forceUpdate?: boolean;
    insecureSkipTlsVerify?: boolean;
    keyFile?: string;
    noUpdate?: boolean;
    passCredentials?: boolean;
    password?: string;
    username?: string;
}

export interface RepoIndexOptions {
    dir: string;
    merge?: string;
    url?: string;
}

export interface RepoListOptions {
    //
}

export interface RepoRemoveOptions {
    repo: string;
}

export interface ReposRemoveOptions {
    repos: string[];
}

export interface RepoUpdateOptions {
    repo: string;
    failOnRepoUpdateFail?: boolean;
}

export interface ReposUpdateOptions {
    repos: string[];
    failOnRepoUpdateFail?: boolean;
}

export interface RollbackOptions {
    release: string;
    revision: string;
    cleanupOnFail?: boolean;
    dryRun?: boolean;
    force?: boolean;
    historyMax?: number;
    noHooks?: boolean;
    recreatePods?: boolean;
    timeout?: number;
    wait?: boolean;
    waitForJob?: boolean;
}

export interface SearchHubOptions {
    keyword: string;
    listRepoUrl?: boolean;
}

export interface SearchRepoOptions {
    keyword: string;
    regexp?: string;
    version?: string;
    versions?: boolean;
}

export interface StatusOptions {
    releaseName: string;
    revision?: number;
    showDesc?: boolean;
}

export interface TemplateOptions {
    name: string;
    chart: string;
    apiVersions?: string[];
    atomic?: boolean;
    caFile?: string;
    certFile?: string;
    createNamespace?: boolean;
    dependencyUpdate?: boolean;
    descriptions?: string;
    disableOpenapiValidation?: boolean;
    dryRun?: boolean;
    generateName?: boolean;
    includeCrds?: boolean;
    insecureSkipTlsVerify?: boolean;
    isUpgrade?: boolean;
    keyFile?: string;
    keyring?: string;
    kubeVersion?: string;
    nameTemplate?: string;
    noHooks?: boolean;
    outputDir?: string;
    passCredentials?: string;
    password?: string;
    postRenderer?: string;
    postRendererArgs?: string[];
    releaseName?: boolean;
    renderSubchartNotes?: boolean;
    replace?: boolean;
    repo?: string;
    set?: string[];
    setFile?: string[];
    setString?: string[];
    showOnly?: string[];
    skipCrds?: boolean;
    skipTests?: boolean;
    timeout?: number;
    username?: string;
    validate?: boolean;
    values?: string[];
    verify?: boolean;
    version?: string;
    wait?: boolean;
    waitForJobs?: boolean;
}

export interface TestOptions {
    release: string;
    filter?: string[];
    logs?: boolean;
    timeout?: number;
}

export interface UninstallOptions {
    release: string;
    description?: string;
    dryRun?: boolean;
    keepHistory?: boolean;
    noHooks?: boolean;
    timeout?: number;
    wait?: boolean;
}

export interface UpgradeOptions {
    release: string;
    chart: string;
    atomic?: boolean;
    caFile?: string;
    certFile?: string;
    cleanupOnFail?: boolean;
    createNamespace?: boolean;
    dependencyUpdate?: boolean;
    descriptions?: string;
    disableOpenapiValidation?: boolean;
    dryRun?: boolean;
    force?: boolean;
    historyMax?: number;
    insecureSkipTlsVerify?: boolean;
    install?: boolean;
    keyFile?: string;
    keyring?: string;
    noHooks?: boolean;
    passCredentials?: string;
    password?: string;
    postRenderer?: string;
    postRendererArgs?: string[];
    renderSubchartNotes?: boolean;
    repo?: string;
    resetValues?: boolean;
    reuseValues?: boolean;
    set?: string[];
    setFile?: string[];
    setString?: string[];
    skipCrds?: boolean;
    timeout?: number;
    username?: string;
    values?: string[];
    verify?: boolean;
    version?: string;
    wait?: boolean;
    waitForJobs?: boolean;
}

export interface VerifyOptions {
    path: string;
    keyring?: string;
}

export interface VersionOptions {
    short?: boolean;
    template?: string;
}

export class Helm {
    public command: Command;
    public options: HelmOptions;

    constructor(options?: HelmOptions) {
        this.command = new Command(options);
    }

    public async create(options: CreateOptions): Promise<void> {
        throw Error('UnimplementedFeature');
    }

    public async dependencyBuild(options: DependencyBuildOptions): Promise<void> {
        throw Error('UnimplementedFeature');
    }

    public async dependencyList(options: DependencyListOptions): Promise<void> {
        /**
         * Notice: json output not supported by helm
         * version.BuildInfo{Version:"v3.7.2", GitCommit:"663a896f4a815053445eec4153677ddc24a0a361", GitTreeState:"clean", GoVersion:"go1.16.10"}
         */
        throw Error('UnsupportedFeature');
    }

    public async dependencyUpdate(options: DependencyUpdateOptions): Promise<void> {
        throw Error('UnimplementedFeature');
    }

    public async env(): Promise<string> {
        throw Error('UnimplementedFeature');
    }

    public async getAll(options: GetAllOptions): Promise<string> {
        throw Error('UnimplementedFeature');
    }

    public async getHooks(options: GetHooksOptions): Promise<string> {
        throw Error('UnimplementedFeature');
    }

    public async getManifest(options: GetManifestOptions): Promise<string> {
        throw Error('UnimplementedFeature');
    }

    public async getNotes(options: GetNotesOptions): Promise<string> {
        throw Error('UnimplementedFeature');
    }

    public async getValues(options: GetValuesOptions): Promise<any> {
        throw Error('UnimplementedFeature');
    }

    public async history(options: HistoryOptions): Promise<any[]> {
        throw Error('UnimplementedFeature');
    }

    public async install(options: InstallOptions): Promise<void> {
        throw Error('UnimplementedFeature');
    }

    public async list(options: ListOptions): Promise<any[]> {
        throw Error('UnimplementedFeature');
    }

    public async package(options: PackageOptions): Promise<void> {
        throw Error('UnimplementedFeature');
    }

    public async pluginInstall(options: PluginInstallOptions): Promise<void> {
        throw Error('UnimplementedFeature');
    }

    public async pluginList(options: PluginListOptions): Promise<void> {
        /**
         * Notice: json output not supported by helm
         * version.BuildInfo{Version:"v3.7.2", GitCommit:"663a896f4a815053445eec4153677ddc24a0a361", GitTreeState:"clean", GoVersion:"go1.16.10"}
         */
        throw Error('UnsupportedFeature');
    }

    public async pluginUninstall(options: PluginUninstallOptions): Promise<void> {
        throw Error('UnimplementedFeature');
    }

    public async pluginUpdate(options: PluginUpdateOptions): Promise<void> {
        throw Error('UnimplementedFeature');
    }

    public async pull(options: PullOptions): Promise<void> {
        throw Error('UnimplementedFeature');
    }

    public async push(options: PushOptions): Promise<void> {
        throw Error('UnimplementedFeature');
    }

    public async registryLogin(options: RegistryLoginOptions): Promise<void> {
        throw Error('UnimplementedFeature');
    }

    public async registryLogout(options: RegistryLogoutOptions): Promise<void> {
        throw Error('UnimplementedFeature');
    }

    public async repoAdd(options: RepoAddOptions): Promise<void> {
        throw Error('UnimplementedFeature');
    }

    public async repoIndex(options: RepoIndexOptions): Promise<void> {
        throw Error('UnimplementedFeature');
    }

    public async repoList(options: RepoListOptions): Promise<any[]> {
        throw Error('UnimplementedFeature');
    }

    public async repoRemove(options: RepoRemoveOptions | ReposRemoveOptions): Promise<void> {
        throw Error('UnimplementedFeature');
    }

    public async repoUpdate(options: RepoUpdateOptions | ReposUpdateOptions): Promise<void> {
        throw Error('UnimplementedFeature');
    }

    public async rollback(options: RollbackOptions): Promise<void> {
        throw Error('UnimplementedFeature');
    }

    public async searchHub(options: SearchHubOptions): Promise<any[]> {
        throw Error('UnimplementedFeature');
    }

    public async searchRepo(options: SearchRepoOptions): Promise<any[]> {
        throw Error('UnimplementedFeature');
    }

    public async status(options: StatusOptions): Promise<any> {
        throw Error('UnimplementedFeature');
    }

    public async template(options: TemplateOptions): Promise<string> {
        throw Error('UnimplementedFeature');
    }

    public async test(options: TestOptions) {
        throw Error('UnimplementedFeature');
    }

    public async uninstall(options: UninstallOptions): Promise<void> {
        throw Error('UnimplementedFeature');
    }

    public async upgrade(options: UpgradeOptions): Promise<void> {
        throw Error('UnimplementedFeature');
    }

    public async verify(options: VerifyOptions): Promise<void> {
        throw Error('UnimplementedFeature');
    }

    public async version(options: VersionOptions): Promise<string> {
        throw Error('UnimplementedFeature');
    }
}
