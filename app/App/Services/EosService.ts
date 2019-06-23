import { JsSignatureProvider } from 'eosjs-rn/dist/eosjs-jssig';
import { Api, JsonRpc } from 'eosjs-rn';
import DriverEntry from './DriverEntry';
import Config from '../Config';
const { TextEncoder, TextDecoder } = require('text-encoding');

export default class EosService {
  private readonly rpc: JsonRpc;
  private readonly api: Api;

  constructor() {
    this.rpc = new JsonRpc(Config.backend.eos);

    // const bobKey = '5HrBJwbchBTr43bJnpWruLVXgYYRbj1mGaioBSWWVcDQJL1UPjG'; // bob
    const aliceKey = '5HrBJwbchBTr43bJnpWruLVXgYYRbj1mGaioBSWWVcDQJL1UPjG'; // alice
    const defaultPrivateKey = aliceKey;

    const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);
    this.api = new Api({
      rpc: this.rpc,
      signatureProvider,
      textDecoder: new TextDecoder(),
      textEncoder: new TextEncoder(),
    } as any);
  }

  async listNodes(): Promise<Array<any>> {
    // console.log('bootstrapnodes', await this.api.getAbi('booty'));
    const result = await this.rpc.get_table_rows({ code: 'booty', table: 'nodes', scope: 'booty' });
    return result.rows;
  }

  async listDrivers(): Promise<Array<DriverEntry>> {
    const nodes = await this.listNodes();
    const driverData = (await this.rpc.get_table_rows({ code: 'persitore', table: 'drivers', scope: 'persitore' })).rows;
    return driverData
      .filter(d => !!nodes.find(n => n.EOSName === d.EOSName))
      .map(d => new DriverEntry(Object.assign(d, nodes.find(n => n.EOSName === d.EOSName))));
  }
}
