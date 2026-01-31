#!/usr/bin/env python3

'''
Used to parse the RE data from rebase and RE references text files.
Print statements have been commented out but would be uncommented so that
data could print one line at a time, allowing for easy copy/paste to an
Excel spreadsheet.
'''

import re


def main():

    num_enzymes = 0
    enzyme_names = []
    prototypes = []
    microorganisms = []
    source_of_microorganisms = []
    meth_sites_types = []
    recognition_sequences = []
    commercial_sources = []
    references = []
    for line in open('RE data from rebase.txt'):
        line = line.rstrip()
        if line.startswith('<1>'):
            num_enzymes += 1
            enzyme = re.search(r'(?<=<1>).+', line)
            enzyme_names.append(enzyme.group())
            # print(enzyme.group())
        elif line.startswith('<2>'):
            prototype = re.search(r'(?<=<2>).+', line)
            if prototype:
                prototypes.append(prototype.group())
                # print(prototype.group())
            else:
                prototypes.append('-')
                # print('-')
        elif line.startswith('<3>'):
            microorganism = re.search(r'(?<=<3>).+', line)
            microorganisms.append(microorganism.group())
            # print(microorganism.group())
        elif line.startswith('<4>'):
            source_of_microorganism = re.search(r'(?<=<4>).+', line)
            source_of_microorganisms.append(source_of_microorganism.group())
            # print(source_of_microorganism.group())
        elif line.startswith('<5>'):
            recognition_sequence = re.search(r'(?<=<5>).+', line)
            if recognition_sequence.group() == '?':
                recognition_sequences.append('-')
                # print('-')
            else:
                recognition_sequences.append(recognition_sequence.group())
                # print(recognition_sequence.group())
        elif line.startswith('<6>'):
            meth_site_type = re.search(r'(?<=<6>).+', line)
            if meth_site_type:
                meth_sites_types.append(meth_site_type.group())
                # print(meth_site_type.group())
            else:
                meth_sites_types.append('-')
                # print('-')
        elif line.startswith('<7>'):
            commercial_source = re.search(r'(?<=<7>).+', line)
            if commercial_source:
                commercial_sources.append(commercial_source.group())
                # print(commercial_source.group())
            else:
                commercial_sources.append('-')
                # print('-')
        elif line.startswith('<8>'):
            reference = re.search(r'(?<=<8>).+', line)
            # Used to change the delimiter from a "," to ";" so that it would
            # work appropriately when importing Excel file as a csv into MySQL
            if ',' in reference.group():
                x = reference.group().split(",")
                y = ';'.join(x)
                references.append(y)
                # print(y)
            else:
                references.append(reference.group())
                # print(reference.group())

    full_references = []
    for line in open('RE references.txt'):
        line = line.rstrip()
        full_reference = re.search(r'(?<=[0-9].\s).+', line)
        full_references.append(full_reference.group())
        #print(full_reference.group())
    for i in range(1, 4167):
        print(i)


if __name__ == '__main__':
    main()
