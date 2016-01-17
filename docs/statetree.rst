### State Tree

state
	players
		playername
			score
				t1
					goal
					current
				t2
					goal
					current
				t3
					goal
					current
			state	registered, strategizing, lobbying, election_idle, gonfaloniering, signoriaing, being_a_winner, being_a_loser

	gamestate	uninitialized, registering_players, strategy, lobby, r1, r2, r3, result

	lobby
		state	idle, running
		score
			t1
				p1	integer
				p2	integer
			t2
				p1	integer
				p2	integer
			t3
				p1	integer
				p2	integer
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
lobby_assign_t1				no
lobby_unassign_t1			no
lobby_assign_t2				no
lobby_unassign_t2			no
lobby_assign_t3				no
lobby_unassign_t3			no
lobby_submit_promises		yes		changes player to election_idle. If all players are election_idle, calculate winners and set election outcome somehow. players are set to gonfaloniering or signoriering
accept_election				no		begins R1
gonfaloniere_select_budget	no
gonfaloniere_submit_budget	yes		moves game to next round, or to result, or to lobby for next period
signoria_select_target		no
signoria_submit_target		yes
accept_term_result			no?
restart						yes
admin_hard_reset			yes