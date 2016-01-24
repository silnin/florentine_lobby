### State Tree

state
	players
		[Bob]
			score
				budget
				t1
				 	reputation
                	vote
                	overState
					goal
					current
					promise6
					promise2
					promise1
				t2
					reputation
                	vote
                	overState
					goal
					current
					promise6
					promise2
					promise1
				t3
					reputation
                	vote
                	overState
					goal
					current
					promise6
					promise2
					promise1

			state	registered, strategizing, wait_for_election, lobbying, election_idle, gonfaloniering, signoriaing, being_a_winner, being_a_loser
	me - reference to current player
	gamestate	uninitialized, registering_players, strategy, lobby, r1, r2, r3, result
	gonfaloniere
		player	player name or unset
		score
			budgets_remaining		list [1,2,3]
			b1
			b2
			b3
	signoria
		player	player name or unset
		score
			r1	t1, t2 or t3
			r2	t1, t2 or t3
			r3	t1, t2 or t3







actions						remote?

register					yes
strategy_add_t1				no
strategy_subtract_t1		no
strategy_add_t2				no
strategy_subtract_t2		no
strategy_add_t3				no
strategy_subtract_t3		no
submit_strategy				yes
promise_resource			yes
lobby_submit_promises		yes		changes player to election_idle. If all players are election_idle, calculate winners and set election outcome somehow. players are set to gonfaloniering or signoriering
accept_election				no		begins R1
gonfaloniere_select_budget	no
gonfaloniere_submit_budget	yes		moves game to next round, or to result, or to lobby for next period
signoria_select_target		no
signoria_submit_target		yes
accept_term_result			no?
restart						yes
admin_hard_reset			yes