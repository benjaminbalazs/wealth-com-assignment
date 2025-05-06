import { Schema, model } from "mongoose";
import type { Model } from "mongoose";
import { objectPlugin } from "./plugins/object";
import type { IID } from "./plugins/object";
import { serializePlugin } from "./plugins/serializer";
import type { Serializer } from "./plugins/serializer";

export interface IType extends IID {
	assetDescription: string | null;
	assetId: string;
	assetInfo: {
		slug: string;
		symbol: string;
		cryptocurrencyName: string;
		quantity?: number;
		nickname: string;
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
	balancePrice: number;
	balancePriceFrom: string;
	balanceQuantityCurrent: number;
	beneficiaryComposition: string | null;
	cognitoId: string;
	creationDate: string;
	currencyCode: string | null;
	deactivateBy: string | null;
	descriptionEstatePlan: string;
	hasInvestment: string | null;
	holdings: {
		majorAssetClasses: {
			assetClasses: {
				minorAssetClass: string;
				value: number;
			}[];
			majorClass: string;
		}[];
	};
	includeInNetWorth: boolean;
	institutionId: number;
	institutionName: string | null;
	integration: string | null;
	integrationAccountId: string | null;
	isActive: boolean;
	isAsset: boolean;
	isFavorite: boolean;
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
	status: string;
	statusCode: string;
	userInstitutionId: string;
	vendorAccountType: string | null;
	vendorContainer: string | null;
	vendorResponse: string | null;
	vendorResponseType: string;
	wealthAssetType: string;
	wid: string;
}

const schema = new Schema<IType>({
	assetDescription: { type: String, default: null },
	assetId: { type: String, unique: true },
	assetInfo: {
		slug: { type: String },
		symbol: { type: String },
		cryptocurrencyName: { type: String },
		quantity: { type: Number },
		nickname: { type: String },
		estimateValue: { type: Number },
		purchaseCost: { type: Number },
		asOfDate: { type: String },
		isFavorite: { type: Boolean, default: false },
	},
	assetInfoType: { type: String, default: null },
	assetMask: { type: String, default: null },
	assetName: { type: String, default: null },
	assetOwnerName: { type: String, default: null },
	balanceAsOf: { type: String, default: null },
	balanceCostBasis: { type: Number, default: 0.0 },
	balanceCostFrom: { type: String, default: "UserManual" },
	balanceCurrent: { type: Number, default: 0.0 },
	balanceFrom: { type: String, default: "UserManual" },
	balancePriceFrom: { type: String },
	balancePrice: { type: Number },
	balanceQuantityCurrent: { type: Number },
	beneficiaryComposition: { type: String },
	cognitoId: { type: String },
	creationDate: { type: String },
	currencyCode: { type: String },
	deactivateBy: { type: String },
	descriptionEstatePlan: { type: String },
	hasInvestment: { type: String },
	holdings: {
		majorAssetClasses: [
			{
				assetClasses: [
					{
						minorAssetClass: { type: String },
						value: { type: Number },
					},
				],
				majorClass: { type: String },
			},
		],
	},
	includeInNetWorth: { type: Boolean },
	institutionId: { type: Number },
	institutionName: { type: String },
	integration: { type: String },
	integrationAccountId: { type: String },
	isActive: { type: Boolean },
	isAsset: { type: Boolean },
	isFavorite: { type: Boolean },
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
	statusCode: { type: String },
	status: { type: String },
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

export interface TypeModel extends Model<IType, {}, Serializer> {}

export const Type = model<IType, TypeModel>("Type", schema);
