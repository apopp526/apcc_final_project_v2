from flask import Flask, request, jsonify, render_template
from db_config import db_config

import mysql.connector

app = Flask(__name__)

@app.route('/')
def re_search():
	return render_template('re_search.html')

@app.route('/help')
def help():
	return render_template('help.html')

@app.route('/process_form', methods=['POST'])
def process_form():
	if request.method == 'POST':
		query = request.form.get('query')
		type = request.form.get('search_types')

		conn = mysql.connector.connect(**db_config)
		curs = conn.cursor()
		
		search_results = {'num_matches': 0, 'matches': list()}

		if type == 'enzyme_name':
			qry = 'SELECT * FROM final_project_data WHERE enzyme_name LIKE (%s)'
			curs.execute(qry, (query,))	
			for (enzyme_name, prototype, microorganism, source_of_microorganism, recognition_sequence, meth_site_type, commercial_source, reference_number, id) in curs:
				search_results['matches'].append({'enzyme_name': enzyme_name, 'prototype': prototype, \
				'microorganism': microorganism, 'source_of_microorganism': source_of_microorganism, \
				'recognition_sequence': recognition_sequence, 'meth_site_type': meth_site_type, \
				'commercial_source': commercial_source, 'reference_number': reference_number})
				search_results['num_matches'] += 1
		
		elif type == 'microorganism':
			qry = 'SELECT enzyme_name, microorganism FROM final_project_data WHERE microorganism LIKE (%s)'
			curs.execute(qry, (query + '%',))
			for (enzyme_name, microorganism) in curs:
				search_results['matches'].append({'enzyme_name': enzyme_name, 'microorganism': microorganism})
				search_results['num_matches'] += 1

		elif type == 'reference_number':
			qry = 'SELECT reference_number, full_reference FROM full_references WHERE reference_number LIKE (%s)'
			curs.execute(qry, (query,))
			for (reference_number, full_reference) in curs:
				search_results['matches'].append({'reference_number': reference_number, 'full_reference': full_reference})
				search_results['num_matches'] += 1

		else:
			qry = f'SELECT enzyme_name FROM final_project_data WHERE {type} LIKE (%s)'
			curs.execute(qry, (query,))
			for enzyme_name in curs:
				search_results['matches'].append({'enzyme_name': enzyme_name})
				search_results['num_matches'] += 1

		curs.close()
		conn.close()

		return jsonify(search_results)

@app.route('/autocomplete')
def autocomplete():
	query = request.args.get('query', '')
	type = request.args.get ('type', '')

	conn = mysql.connector.connect(**db_config)
	curs = conn.cursor()

	search_results = []
	limit = 5	
	qry = f'SELECT {type} FROM final_project_data WHERE {type} LIKE %s'
	curs.execute(qry, (f"{query}%",))	
	for num in curs.fetchall():
		if {'value': num[0], 'label': num[0]} not in search_results:
			search_results.append({'value': num[0], 'label': num[0]})
			if len(search_results) == limit:
				break
		else:
			continue 

	curs.close()
	conn.close()

	return jsonify(search_results)

if __name__ == '__main__':
   app.run(debug=True)