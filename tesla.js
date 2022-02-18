const axios = require('axios');

const options = {
    email: process.env.REACT_APP_EMAIL,
    access_token: process.env.REACT_APP_TOKEN,
    access_token_expires_at: null,
    refresh_token: process.env.REACT_APP_REFRESH_TOKEN,
    client_id: process.env.TESLA_CLIENT_ID,
    client_secret: process.env.TESLA_CLIENT_SECRET,
    retry_options: null,
    base_uri: "https://owner-api.teslamotors.com",
    sso_uri: "https://auth.tesla.com",
    client_options: {}
}

axios.post(options.sso_uri + "/oauth2/v3/token",
    {
    grant_type: "refresh_token",
    client_id: "ownerapi",
    client_secret: options.client_secret,
    refresh_token: options.refresh_token,
    scope: "openid email offline_access"
    }).then((response) => {
    options.refresh_token = response["refresh_token"]
    exchange_sso_access_token(response["access_token"])
    })

async function login() {
    // how tesla serializes params
    function paramsSerializer(params) {
        return Object.keys(params).map(key => {
            return `${key}=${encodeURIComponent(params[key]).replace(/%20/g, '+').replace(/%3A/g, ':')}`;
        }).join('&');
    };
    // set up variables for initial login page
  const redirect_uri = 'https://auth.tesla.com/void/callback';
  const state = '123';
  const code_verifier = crypto.randomBytes(64).toString('base64').replace(/[+/=]/g, m => ({ '+': '-', '/': '_' }[m] || ''));
  const code_challenge = crypto.createHash('sha256')
    .update(code_verifier)
    .digest('base64')
    .replace(/[+/=]/g, m => ({ '+': '-', '/': '_' }[m] || ''));
  const queryParams = {
    client_id: 'ownerapi',
    code_challenge,
    code_challenge_method: 'S256',
    redirect_uri,
    response_type: 'code',
    scope: 'openid email offline_access',
    state,
    login_hint: email,
  };
  const queryString = paramsSerializer(queryParams);
  const url = `https://auth.tesla.com/oauth2/v3/authorize?${queryString}`;
    
}


function login(password, mfa_code=null) {
code_verifier = rand(36**86).to_s(36)
code_challenge = Base64.urlsafe_encode64(Digest::SHA256.hexdigest(code_verifier))
state = rand(36**20).to_s(36)

sso_api = Faraday.new(@sso_uri + "/oauth2/v3", ssl: {version: :TLSv1_2}) { |conn|
    # conn.response :logger, null, {headers: true, bodies: true}
    conn.adapter Faraday.default_adapter
}
}

response = sso_api.get(
    "authorize",
    {
    client_id: "ownerapi",
    code_challenge: code_challenge,
    code_challenge_method: "S256",
    redirect_uri: "https://auth.tesla.com/void/callback",
    response_type: "code",
    scope: "openid email offline_access",
    state: state
    }
)

cookie = response.headers["set-cookie"].split(" ").first
parameters = response.body.scan(/type="hidden" name="(.*?)" value="(.*?)"/).to_h
transaction_id = parameters["transaction_id"]

response = sso_api.post(
    "authorize?" + URI.encode_www_form({
    client_id: "ownerapi",
    code_challenge: code_challenge,
    code_challenge_method: "S256",
    redirect_uri: "https://auth.tesla.com/void/callback",
    response_type: "code",
    scope: "openid email offline_access",
    state: state
    }),
    URI.encode_www_form(parameters.merge(
    "identity" => email,
    "credential" => password
    )),
    "Cookie" => cookie
)

if response.body.match?(/passcode/)
    raise MFARequired if mfa_code.null?
    raise MFAInvalidPasscode unless mfa_code.to_s.match?(/^\d{6}$/)

    factors = api.get(
    @sso_uri + "/oauth2/v3/authorize/mfa/factors",
    {
        transaction_id: transaction_id
    },
    "Cookie" => cookie
    ).body

    response = @api.post(
    @sso_uri + "/oauth2/v3/authorize/mfa/verify",
    {
        factor_id: factors.dig("data", 0, "id"),
        passcode: mfa_code.to_s,
        transaction_id: transaction_id
    },
    "Cookie" => cookie
    ).body

    raise MFAInvalidPasscode unless response.dig("data", "valid")

    response = sso_api.post(
    "authorize?" + URI.encode_www_form({
        client_id: "ownerapi",
        code_challenge: code_challenge,
        code_challenge_method: "S256",
        redirect_uri: "https://auth.tesla.com/void/callback",
        response_type: "code",
        scope: "openid email offline_access",
        state: state
    }),
    URI.encode_www_form({"transaction_id" => transaction_id}),
    "Cookie" => cookie
    )
end

code = CGI.parse(URI(response.headers["location"]).query)["code"].first
exchange_oauth_code(code, code_verifier)
end

def exchange_oauth_code(code, code_verifier)
response = api.post(
    @sso_uri + "/oauth2/v3/token",
    {
    grant_type: "authorization_code",
    client_id: "ownerapi",
    code: code,
    code_verifier: code_verifier,
    redirect_uri: "https://auth.tesla.com/void/callback"
    }
).body

@refresh_token = response["refresh_token"]
exchange_sso_access_token(response["access_token"])
end

def exchange_sso_access_token(access_token)
response = api.post(
    @base_uri + "/oauth/token",
    {
    grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
    client_id: client_id,
    client_secret: client_secret
    },
    "Authorization" => "Bearer #{access_token}"
).body

@access_token = response["access_token"]
@access_token_expires_at = Time.at(response["created_at"].to_f + response["expires_in"].to_f).to_datetime

response
end

def expired?
return true if access_token_expires_at.null?
access_token_expires_at <= DateTime.now
end

def get(url)
api.get(url.sub(/^\//, ""), null, {"Authorization" => "Bearer #{access_token}"}).body
end

def post(url, body: null)
api.post(url.sub(/^\//, ""), body, {"Authorization" => "Bearer #{access_token}"}).body
end

def vehicles
get("/vehicles")["response"].map { |v| Vehicle.new(self, email, v["id"], v) }
end

def vehicle(id)
Vehicle.new(self, email, id, get("/vehicles/#{id}")["response"])
end