package com.quicktutor.quicktutor;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

public class LoginActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        final EditText editTextUsername = (EditText) findViewById(R.id.editTextLoginEmail);
        //TODO encrypt
        final EditText editTextPassword = (EditText) findViewById(R.id.editTextPassword);
        final Button buttonLogin = (Button) findViewById(R.id.buttonLogin);
        final TextView textViewRegister = (TextView) findViewById(R.id.textViewRegister);

        // Open register page
        textViewRegister.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent registerIntent = new Intent(LoginActivity.this, RegisterActivity.class);
                LoginActivity.this.startActivity(registerIntent);
            }
        });

        buttonLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent homeIntent = new Intent(LoginActivity.this, MainActivity.class);
                LoginActivity.this.startActivity(homeIntent);
            }
        });
    }
}
