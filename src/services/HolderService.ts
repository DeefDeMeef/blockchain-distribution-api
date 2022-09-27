import {IHolder, Holder} from '@/models/Holder';
export default class HolderService {
    static async addHolder(req: any, res?: any) {
        console.log('Body', req);
        const holder = await Holder.create({
            address: req.address,
            balance: req.balance,
            endStaking: req.endStaking,
            stakedAmount: req.stakedAmount,
        });

        res.status(200).json(holder);
    }

    static async getOneHolder(address: string) {
        return Holder.findOne({ address });
    }

    static async listHolders() {
        return Holder.find();
    }
  
  static async removeHolder(address: string) {
        return Holder.deleteOne({ address });
  }
}