import { Schema, model } from "mongoose";
import type { Model } from "mongoose";
import { objectPlugin } from "./plugins/object";
import type { IID } from "./plugins/object";
import { serializePlugin } from "./plugins/serializer";
import type { Serializer } from "./plugins/serializer";

export interface IItem extends IID {
	assetDescription: string | null;
	assetId: string;
	assetInfo: {
		nickname: string;
		descriptionEstatePlan: string;
		estimateValue: number;
		purchaseCost: number;
		asOfDate: string;
		isFavorite: boolean;
	};
	assetInfoType: string;
	assetMask: string | null;
	assetName: string | null;
	assetOwnerName: string | null;
	balanceAsOf: string;
	balanceCostBasis: number;
	balanceCostFrom: string;
	balanceCurrent: number;
	balanceFrom: string;
	balancePrice: string | null;
	balancePriceFrom: string;
	balanceQuantityCurrent: number;
	beneficiaryComposition: string | null;
	cognitoId: string;
	creationDate: string;
	currencyCode: string | null;
	deactivateBy: string | null;
	descriptionEstatePlan: string;
	hasInvestment: string | null;
	holdings: string | null;
	includeInNetWorth: boolean;
	institutionId: number;
	institutionName: string | null;
	integration: string | null;
	integrationAccountId: string | null;
	isLinkedVendor: string | null;
	lastUpdate: string;
	lastUpdateAttempt: string;
	logoName: string | null;
	modificationDate: string;
	nextUpdate: string | null;
	nickname: string;
	note: string | null;
	noteDate: string | null;
	ownership: string | null;
	primaryAssetCategory: string;
	status: string | null;
	statusCode: string | null;
	userInstitutionId: string;
	vendorAccountType: string | null;
	vendorContainer: string | null;
	vendorResponse: string | null;
	vendorResponseType: string;
	wealthAssetType: string;
	wid: string;
}

const schema = new Schema<IItem>({
	assetDescription: { type: String },
	assetId: { type: String, unique: true },
	assetInfo: {
		nickname: { type: String },
		descriptionEstatePlan: { type: String },
		estimateValue: { type: Number },
		purchaseCost: { type: Number },
		asOfDate: { type: String },
		isFavorite: { type: Boolean },
	},
	assetInfoType: { type: String },
	assetMask: { type: String },
	assetName: { type: String },
	assetOwnerName: { type: String },
	balanceAsOf: { type: String },
	balanceCostBasis: { type: Number },
	balanceCostFrom: { type: String },
	balanceCurrent: { type: Number },
	balanceFrom: { type: String },
	balancePrice: { type: String },
	balancePriceFrom: { type: String },
	balanceQuantityCurrent: { type: Number },
	beneficiaryComposition: { type: String },
	cognitoId: { type: String },
	creationDate: { type: String },
	currencyCode: { type: String },
	deactivateBy: { type: String },
	descriptionEstatePlan: { type: String },
	hasInvestment: { type: String },
	holdings: { type: String },
	includeInNetWorth: { type: Boolean },
	institutionId: { type: Number },
	institutionName: { type: String },
	integration: { type: String },
	integrationAccountId: { type: String },
	isLinkedVendor: { type: String },
	lastUpdate: { type: String },
	lastUpdateAttempt: { type: String },
	logoName: { type: String },
	modificationDate: { type: String },
	nextUpdate: { type: String },
	nickname: { type: String },
	note: { type: String },
	noteDate: { type: String },
	ownership: { type: String },
	primaryAssetCategory: { type: String },
	status: { type: String },
	statusCode: { type: String },
	userInstitutionId: { type: String },
	vendorAccountType: { type: String },
	vendorContainer: { type: String },
	vendorResponse: { type: String },
	vendorResponseType: { type: String },
	wealthAssetType: { type: String },
	wid: { type: String },
});

schema.plugin(objectPlugin);
schema.plugin(serializePlugin);

export interface ItemModel extends Model<IItem, {}, Serializer> {}

export const Item = model<IItem, ItemModel>("Item", schema);
