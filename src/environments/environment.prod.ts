function readEnvironmentVariable(name: string, defaultValue: any) {
  // @ts-ignore
  const env = window['env'];
  if (env === undefined || null) {
    return defaultValue;
  }

  const value = env[name];
  if (value === undefined) {
    return defaultValue;
  }

  return value;
}


export const environment = {
  production: true,
  baseUrl: readEnvironmentVariable('searchServiceUrl','https://kong.dev.parking.scheidt-bachmann.net/'),
  searchServicePath: 'search-service/',
  opaUrl: readEnvironmentVariable('opaUrl', 'https://kong.dev.parking.scheidt-bachmann.net/open-policy-agent/'),
  mockPm: false,
  mockPmTenant: "not used, mock pm should be false",
  mockPmUserRoles: ["not used, mock pm should be false"],
  mockPmUserLocale: "not used, mock pm should be false",
  mockOpa: false
};
