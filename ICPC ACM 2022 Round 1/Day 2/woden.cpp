#include <iostream>
#include <vector>
#include <string>
#include <sstream>

using namespace std;

int main()
{
	
	vector<int> arr;
	string str, temp;
	int size, t_size, cost, num1, num2 ,length;
  	cin >> size;
	cin.ignore();
	for (int i = 0; i < size; i++)
	{
		
		getline(cin, str);
		length = str.size();
		str = str.substr(1, length - 2);
		length = length - 2;
		t_size = 1; 
		temp = ""; 
		for (int z = 0; z < length; z++)
		{
			if (str[z] == ',')
			{
				arr.push_back(stoi(temp));
				t_size++; 
				temp = "";
			}
			else
				temp += str[z]; 
		}
		arr.push_back(stoi(temp)); 
		cost = 0;
		while (t_size > 1)
		{
			num1 = arr.front();
			num2 = arr.back();
			cost += num1 + num2;
			if (num1 < num2)
			{
				arr.pop_back();
			}
			else
				arr.erase(arr.begin());
			t_size--;
		}
		cout << cost << "\n";
	}
}