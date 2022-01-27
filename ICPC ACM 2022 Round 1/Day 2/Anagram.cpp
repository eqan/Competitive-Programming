#include<iostream>
#include<cstring>
#include<string>

using namespace std;
int main()
{
	string str1;
	string str2;
	bool w=1;
	int c, l=0, count=0;
	cin>>c;
	for(int i=0;i<c;i++)
	{
	    getline(cin,str1);
	    cin.ignore();
	    getline(cin,str2);
	  
		
		for(unsigned int i=0;i<str1.length();i++)
		{
			if(str1[i]>=97 && str1[i]<=122)
			 str1[i]=str1[i]-32;
			 
		}
		for(unsigned int i=0;i<str2.length();i++)
		{
			if(str2[i]>=97 && str2[i]<=122)
			 str2[i]=str2[i]-32;
			 
		}
		l=str2.length();
			for(unsigned int j=0;j<str2.length();j++)
		{
			w=1;
			if(str2[j]!=' '){
			for(unsigned int k=0;k<str1.length();k++)
			{
				if(w==1)
				{
					
				if(str1[k]!=' ')
				{
				if(str2[j]==str1[k])
				{
					str1[k]=' ';
					count++;
					w=0;
				}
			}
		}
			}
		}
		}
		if(count==l)
		cout<<"Possible";
		else
		cout<<"Not Possible";
		cout<<endl;
		l=0;
	}
}
