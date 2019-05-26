// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.


using IdentityServer4.Models;
using System.Collections.Generic;

namespace VSI.IdentityServer
{
    public static class Config
    {
        public static IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new IdentityResource[]
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
            };
        }

        public static IEnumerable<ApiResource> GetApis()
        {
            return new ApiResource[]
            {
                new ApiResource("vsi.api", "My API #1")
            };
        }

        public static IEnumerable<Client> GetClients()
        {
            return new[]
            {
                new Client
                {
                    ClientId = "spa",
                    ClientName = "SPA Client",

                    AllowedGrantTypes = GrantTypes.Implicit,
                    AllowAccessTokensViaBrowser = true,

                    RedirectUris = { "http://localhost:8080/auth-callback" },
                    PostLogoutRedirectUris = { "http://localhost:8080" },
                    AllowedCorsOrigins = { "http://localhost:8080" },

                    RequireConsent = false,
                    UpdateAccessTokenClaimsOnRefresh=true,
                    RefreshTokenExpiration = TokenExpiration.Sliding,
                    RefreshTokenUsage = TokenUsage.OneTimeOnly,
                    AbsoluteRefreshTokenLifetime = 0,

                    AllowedScopes = { "openid", "profile", "vsi.api" },
                    AccessTokenLifetime = 3600
                }
            };
        }
    }
}