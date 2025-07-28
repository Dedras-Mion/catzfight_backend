const express = require('express');
const { Alchemy } = require('alchemy-sdk');
const { Network } = require('alchemy-sdk');

const app = express();

const config = {
  apiKey: 'Fxmfls6frj5CKArdLMDMMESogb0Y0JO0',
  network: Network.ETH_GOERLI,
};

const alchemy = new Alchemy(config);

async function findIds(req, res, next) {
  try {
    // Get all NFTs
    const nfts = await alchemy.nft.getNftsForOwner(req.body.address);
    // Print NFTs
    const len = nfts.ownedNfts.length;
    const IDs = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < len; i++) {
      IDs.push(nfts.ownedNfts[i].tokenId);
    }
    return res.json(IDs);
  } catch (error) {
    return next(error);
  }
}

async function findUrls(req, res, next) {
  try {
    const nfts = await alchemy.nft.getNftsForOwner(req.body.address);
    const len = nfts.ownedNfts.length;
    const urls = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < len; i++) {
      urls.push(nfts.ownedNfts[i].media[0].gateway);
    }
    return res.json(urls);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  findIds,
  findUrls,
};
