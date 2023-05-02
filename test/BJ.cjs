// SPDX-License-Identifier: MIT
const BJ = artifacts.require("BJ");

contract("BJ", (accounts) => {
  let bj;

  before(async () => {
    bj = await BJ.deployed();
  });

  it("should have an entrance fee of 1 ether", async () => {
    const expected = web3.utils.toWei("1", "ether");
    const actual = await bj.entranceFee();
    assert.equal(actual.toString(), expected.toString(), "Entrance fee is incorrect");
  });

  it("should add players upon entrance with minimum fee", async () => {
    const player1 = accounts[0];
    const player2 = accounts[1];
    const bet = web3.utils.toWei("2", "ether");

    // Player 1 should be able to enter with the minimum entrance fee
    const countBefore = await bj.getPlayersCount();
    await bj.entrance({ value: web3.utils.toWei("1", "ether"), from: player1 });
    const countAfter = await bj.getPlayersCount();
    assert.equal(countAfter.toNumber(), countBefore.toNumber() + 1, "Player should be added after entrance");

    // Player 2 should also be able to enter with the minimum entrance fee
    const countBefore2 = await bj.getPlayersCount();
    await bj.entrance({ value: bet, from: player2 });
    const countAfter2 = await bj.getPlayersCount();
    assert.equal(countAfter2.toNumber(), countBefore2.toNumber() + 1, "Another player should be added after entrance");
  });
});
