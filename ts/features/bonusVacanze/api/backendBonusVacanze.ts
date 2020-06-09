import {
  ApiHeaderJson,
  basicResponseDecoder,
  BasicResponseType,
  composeHeaderProducers,
  createFetchRequestForApi,
  IGetApiRequestType
} from "italia-ts-commons/lib/requests";
import {
  getBonusEligibilityCheckDefaultDecoder,
  GetBonusEligibilityCheckT,
  getLatestBonusActivationByIdDefaultDecoder,
  GetLatestBonusActivationByIdT,
  startBonusActivationProcedureDefaultDecoder,
  StartBonusActivationProcedureT,
  startBonusEligibilityCheckDefaultDecoder,
  StartBonusEligibilityCheckT
} from "../../../../definitions/bonus_vacanze/requestTypes";
import { ParamAuthorizationBearerHeaderProducer } from "../../../api/backend";
import { defaultRetryingFetch } from "../../../utils/fetch";
import {
  BonusesAvailable,
  BonusesAvailableCodec
} from "../types/bonusesAvailable";

type GetBonusListT = IGetApiRequestType<
  {},
  never,
  never,
  BasicResponseType<BonusesAvailable>
>;
const tokenHeaderProducer = ParamAuthorizationBearerHeaderProducer();

const getLatestBonusFromIdT: GetLatestBonusActivationByIdT = {
  method: "get",
  url: params => `/bonus/vacanze/activations/${params.bonus_id}`,
  query: _ => ({}),
  headers: tokenHeaderProducer,
  response_decoder: getLatestBonusActivationByIdDefaultDecoder()
};

const startBonusActivationProcedure: StartBonusActivationProcedureT = {
  method: "post",
  url: () => `/bonus/vacanze/activations`,
  query: _ => ({}),
  body: _ => "",
  headers: composeHeaderProducers(tokenHeaderProducer, ApiHeaderJson),
  response_decoder: startBonusActivationProcedureDefaultDecoder()
};

const startBonusEligibilityCheckT: StartBonusEligibilityCheckT = {
  method: "post",
  url: () => `/bonus/vacanze/eligibility`,
  query: _ => ({}),
  body: _ => "",
  headers: composeHeaderProducers(tokenHeaderProducer, ApiHeaderJson),
  response_decoder: startBonusEligibilityCheckDefaultDecoder()
};

const getBonusEligibilityCheckT: GetBonusEligibilityCheckT = {
  method: "get",
  url: () => `/bonus/vacanze/eligibility`,
  query: _ => ({}),
  headers: tokenHeaderProducer,
  response_decoder: getBonusEligibilityCheckDefaultDecoder()
};

const getAvailableBonusesT: GetBonusListT = {
  method: "get",
  url: () => `/bonus/vacanze`,
  query: _ => ({}),
  headers: () => ({}),
  response_decoder: basicResponseDecoder(BonusesAvailableCodec)
};

//
// A specific backend client to handle bonus vacanze requests
//
export function BackendBonusVacanze(
  baseUrl: string,
  token: string,
  fetchApi: typeof fetch = defaultRetryingFetch()
) {
  const options = {
    baseUrl,
    fetchApi
  };

  // withBearerToken injects the field 'Baerer' with value token into the parameter P
  // of the f function
  const withBearerToken = <P extends { Bearer: string }, R>(
    f: (p: P) => Promise<R>
  ) => async (po: Omit<P, "Bearer">): Promise<R> => {
    const params = Object.assign({ Bearer: String(token) }, po) as P;
    return f(params);
  };

  return {
    getAvailableBonuses: createFetchRequestForApi(
      getAvailableBonusesT,
      options
    ),
    startBonusEligibilityCheck: withBearerToken(
      createFetchRequestForApi(startBonusEligibilityCheckT, options)
    ),
    getBonusEligibilityCheck: withBearerToken(
      createFetchRequestForApi(getBonusEligibilityCheckT, options)
    ),
    getLatestBonusVacanzeFromId: withBearerToken(
      createFetchRequestForApi(getLatestBonusFromIdT, options)
    ),
    startBonusActivationProcedure: withBearerToken(
      createFetchRequestForApi(startBonusActivationProcedure, options)
    )
  };
}
