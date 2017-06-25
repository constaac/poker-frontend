'use strict'

module.exports = function (x) {
  this.id = undefined
  this.name = 'Player ' + x
  this.sitting = false
  this.playing = false
  this.is_user = false
  this.is_dealer = false
  this.hand_count = 0
  this.hand_count_career = 0
  this.call_preflop = 0
  this.call_preflop_temp = 0
  this.call_preflop_career = 0
  this.raise_preflop = 0
  this.raise_preflop_temp = 0
  this.raise_preflop_career = 0
  this.has_raised_preflop = false
  this.has_raised_or_called_preflop = false
  this.call_or_raise_preflop = 0
  this.call_or_raise_preflop_temp = 0
  this.call_or_raise_preflop_career = 0
  this.reraise_preflop = 0
  this.reraise_preflop_temp = 0
  this.reraise_preflop_career = 0
  this.has_reraised_preflop = false
  this.call_to_raise_preflop = 0
  this.call_to_raise_preflop_temp = 0
  this.call_to_raise_preflop_career = 0
  this.has_called_to_raise_preflop = false
  this.has_called_or_reraised_to_raise_preflop = false
  this.fold_on_reraise_preflop = 0
  this.fold_on_reraise_preflop_temp = 0
  this.fold_on_reraise_preflop_career = 0
  this.personal_bet_count = 0
}
