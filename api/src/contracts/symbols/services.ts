class ServiceTokens {
    public static readonly IEmailService = Symbol("IEmailService");
    public static readonly Subscriptions = Symbol("Subscriptions");
}

export { ServiceTokens };